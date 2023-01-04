const serverless = require('serverless-http');
const express = require('express')
const app = express()
 
app.get('/app', function (req, res) {
  res.send('Hello World!')
})

module.exports.lambdaHandler = serverless(app);