import { Client } from '@elastic/elasticsearch'

const SIZE_LIMIT = 500

export default class ESClient {
  constructor() {
    this.client = new Client({ node: process.env.ES_CLIENT })
  }
  async save(data) {
    data.timestamp = new Date()
    try {
      await this.client.index({
        index: process.env.ELASTIC_SEARCH_INDEX,
        body: data,
        refresh: true,
      })
      return { success: true }
    } catch (e) {
      console.log(e)
      return { error: true, error: e }
    }
  }
  get({ page=0 } = {}) {
    const res = this.client.search({
      index: process.env.ELASTIC_SEARCH_INDEX,
      from: page,
      size: SIZE_LIMIT,
    })
    return res
  }
  async delete(id) {
    const res = await this.client.delete({
      id: id,
      index: process.env.ELASTIC_SEARCH_INDEX,
      refresh: true
    })

    return {
      success: true
    }
  }
  async update({ id, data }={}) {
    const res = await this.client.update({
      id: id,
      index: process.env.ELASTIC_SEARCH_INDEX,
      body: { doc: data },
      refresh: true
    })

    return {
      success: true
    }
  }
}