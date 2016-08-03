const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('OK');
});

router.use('/excursions', require('./excursions'));

module.exports = router;
