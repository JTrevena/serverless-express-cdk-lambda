async function helloWorld(event) {
  return {
    body: "Hello World",
    statusCode: 200,
  }
}

module.exports.lambdaHandler = helloWorld;
