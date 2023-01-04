const express = require('express');


const router = express.Router();

router.get('/', function (req, res) {
  res.send({
    message: "test response",
  })
})

module.exports = router;