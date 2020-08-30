const express = require('express');
const router = express.Router();
const producerService = require('../../services/producer');

router.post('/', async (req, res) => {
  try {
    let data = await producerService.sendParseStockQuote(req.body);
    return res.json({data: data, errors: null});
  } catch (err) {
    console.log(err);
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

module.exports = router;
