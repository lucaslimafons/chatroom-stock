const BaseService = require('./base');
const ChatError = require('../helpers/error');
const stooqService = require('./stooq');
const producerService = require('./producer');

class ConsumerService extends BaseService {
  async parseStockQuote(code, user) {
    let result = {
      code: code,
      user: user
    };

    try {
      let stockQuote = await stooqService.getStockQuote(code);
      result.result = stockQuote;
      producerService.sendResultStockQuote(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      result.result = e;
      producerService.sendResultStockQuote(JSON.stringify(result));
    }
  }
}

module.exports = new ConsumerService();
