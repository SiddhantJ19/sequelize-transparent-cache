const Redis = require('ioredis') // 1 imdg nodejs client
const redis = new Redis()

const RedisAdaptor = require('../../packages/sequelize-transparent-cache-ioredis')
const redisAdaptor = new RedisAdaptor({ // 2 imdg adapter with multiple config options
  client: redis,
  namespace: 'model',
  lifetime: 60 * 60
})

const sequelizeCache = require('../../packages/sequelize-transparent-cache')
const { withCache } = sequelizeCache(redisAdaptor) // 3 common interface, extending methods for withcache

const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
})

// Register and wrap your models:
// withCache() will add cache() methods to all models and instances in sequelize v4
const user = sequelize.import('./models/user')

const User = withCache(user)

async function start () {
  await sequelize.sync()

  // Create user in db and in cache
  // await User.cache().create({
  //   id: 3,
  //   name: 'Daniel'
  // })
  // await Parent.cache().create({
  //   id: 3,
  //   name: 'Parent_DAN',
  //   userId: 3
  // })
  // await Grand.cache().create({
  //   id: 3,
  //   name: 'grand_DAN',
  //   parentId: 3
  // })

  // Load user from cache
  // const user = await User.cache().findByPk(1)
  // console.log(user)
  // const parent = await Parent.cache().findByPk(1)
  // const grand = await Grand.cache().findByPk(1)
  // console.log(parent)
  // await User.cache('Daniel').clear()
  // const user2 = await User.cache().findByPk(11)
  // console.log("SSSS", user2)

  // Update in db and cache
  // await user.cache().update({
  //   name: 'Vikki'
  // })

  // Cache result of arbitrary query - requires cache key

  process.exit()
}

start()
