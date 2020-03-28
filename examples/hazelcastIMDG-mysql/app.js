const Adapter = require('../../packages/sequelize-transparent-cache-hazelcast-IMDG')
const hazelcast = require('hazelcast-client')
const config = new hazelcast.Config.ClientConfig()
const sequelizeCache = require('../../packages/sequelize-transparent-cache')
const Sequelize = require('sequelize')

const run = async function () {
  const client = await hazelcast.Client.newHazelcastClient(config)
  const _adapter = new Adapter({
    client: client,
    namespace: 'model'
  })

  const { withCache } = sequelizeCache(_adapter)
  const sequelize = new Sequelize('database', 'user', 'password', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
  })

  const User = withCache(sequelize.import('./models/user'))
  await sequelize.sync()

  await User.cache().create({
    id: '3',
    name: 'Daniel'
  })
  const res = await User.cache().findByPk('3')
  console.log('res', res)
  return 1
}

run().then(() => (console.log('done')))
