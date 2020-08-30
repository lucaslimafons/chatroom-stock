const kafka = require('kafka-node');
const consumerService = require('../services/consumer');
let consumer = null;

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(process.env.KAFKA_SERVER);
  consumer = new Consumer(
    client,
    [
      { topic: process.env.KAFKA_TOPIC_PARSE, partition: 0 }
    ],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );

  consumer.on('message', async function(message) {
    console.log('consumer');
    console.log(message);

    if (message.topic == process.env.KAFKA_TOPIC_PARSE) {
      // Apply parse stock quote here
      let data = JSON.parse(message.value);
      consumerService.parseStockQuote(data.code, data.user);
    }
  });

  consumer.on('error', function(err) {
    console.log('error', err);
  });
} catch(e) {
  console.log(e);
}

module.exports = consumer;
