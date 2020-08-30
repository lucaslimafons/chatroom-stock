const express = require('express');
const router = express.Router();

router.use('/api/stock-quote', require('./api/stock'));

module.exports = router;
