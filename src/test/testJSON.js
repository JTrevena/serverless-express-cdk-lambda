async function testJSONResponse(event) {
    return {
      body: JSON.stringify({
        response: "test response",
      }),
      statusCode: 200,
    }
  }
  
  module.exports.lambdaHandler = testJSONResponse;
  