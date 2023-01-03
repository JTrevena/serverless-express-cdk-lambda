import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require('path');
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ExpressLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "widgets-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });

    // add express app to '/' endpoint
    
    const appLambdaFunc = new lambda.Function(this, 'ServerlessApp', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.lambdaHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/app')),
    });
    const getWidgetsIntegration = new apigateway.LambdaIntegration(appLambdaFunc, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });
    api.root.addMethod("GET", getWidgetsIntegration);

    // add lambda functions directly to '/test' endpoint

    const test = api.root.addResource("test");

    const testHelloWorldLambda = new lambda.Function(this, 'testHelloWorld', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'testHelloWorld.lambdaHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/test')),
    })
    const testHelloWorld = test.addResource("hello");
    testHelloWorld.addMethod("GET", new apigateway.LambdaIntegration(testHelloWorldLambda))

    const testJSONLambda = new lambda.Function(this, 'testJSONLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'testJSON.lambdaHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/test')),
    })
    const testJSON = test.addResource("json")
    testJSON.addMethod("GET", new apigateway.LambdaIntegration(testJSONLambda))
  }
}
