class HazelcastIMDGAdapter {
  constructor ({ client, namespace }) {
    this.client = client
    this.namespace = namespace
    this.imap = this.client.getMap(namespace).then(mp => mp)
  }

  async set (key, value) {
    this.imap = await this.imap
    const res = await this.imap.put(key, JSON.stringify(value))
    return res
  }

  async get (key) {
    this.imap = await this.imap
    const res = await this.imap.get(key)
    return JSON.parse(res)
  }

  async del (key) {
    this.imap = await this.imap
    const res = this.imap.remove(key)
    return res
  }
}

module.exports = HazelcastIMDGAdapter
