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

    // add single lambda function to '/test' endpoint

    const testLambda = new lambda.Function(this, 'testLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.lambdaHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/test')),
    })
    const test = api.root.addResource("test");
    test.addMethod("GET", new apigateway.LambdaIntegration(testLambda))
  }
}
