async function testFunction(event) {
  return {
    body: "Hello World",
    statusCode: 200,
  }
}

module.exports.lambdaHandler = testFunction