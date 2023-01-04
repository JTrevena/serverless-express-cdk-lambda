const serverless = require('serverless-http');
const express = require('express')
const test = require('./routes/test')


const app = express()

app.get('/hello', function(req,res){
  res.send('Hello from specific path endpoint.')
})
app.use('/test',test)

module.exports.lambdaHandler = serverless(app, {basePath:'/api'});
