const { RESTDataSource } = require('apollo-datasource-rest');

class PrintfulAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.printful.com';
  }

  willSendRequest(request) {
    request.headers.set(
      'Authorization',
      `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
    );
  }

  async createOrder({ recipient, items }) {
    try {
      const { result: data } = await this.post(`orders`, { recipient, items });

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = PrintfulAPI;
