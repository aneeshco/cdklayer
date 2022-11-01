import * as cdk from 'aws-cdk-lib';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { RemovalPolicy } from 'aws-cdk-lib';

/*

Create Lambda Layer and Lambda

*/
export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const layerVersion = new lambda.LayerVersion(this, 'MyLayer', {
      removalPolicy: RemovalPolicy.RETAIN,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../services/common')),
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
      compatibleArchitectures: [lambda.Architecture.X86_64, lambda.Architecture.ARM_64],
    });
    
    new nodejs.NodejsFunction(this, 'lambda1', {
      entry: path.join(__dirname,`../../services/lambda1/index.js`),
      environment: {LOG_LEVEL: 'INFO'},
      bundling: {externalModules: ['aws-sdk']},
      layers: [layerVersion],
      functionName: 'lambdaA',
      depsLockFilePath: path.join(__dirname,`../../yarn.lock`),
      runtime: lambda.Runtime.NODEJS_16_X,
    });

    new nodejs.NodejsFunction(this, 'lambda2', {
      entry: path.join(__dirname,'../../services/lambda2/index.js'),
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {externalModules: ['aws-sdk']},
      layers: [layerVersion],
      environment: {LOG_LEVEL: 'INFO'},
      functionName: 'lambdaB',
      depsLockFilePath: path.join(__dirname,`../../yarn.lock`),
      handler: 'handler'
    });
    
    
  }
}
