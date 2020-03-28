const hazelcast = require('hazelcast-client')
const config = new hazelcast.Config.ClientConfig()
const run = async function () {
  const client = await hazelcast.Client.newHazelcastClient(config)
  client.getMap('new_map').then(mp => {
    mp.set('Alice', 'Bob')
  })
  return 1
}

run().then(() => (console.log('done')))