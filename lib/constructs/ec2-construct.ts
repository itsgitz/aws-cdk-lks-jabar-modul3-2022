import { Construct } from 'constructs';
import {
  aws_ec2 as ec2,
  aws_autoscaling as autoscaling
} from 'aws-cdk-lib';

export class EC2Construct extends Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const vpc: ec2.Vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.0.0.0/24',
      subnetConfiguration: [
        {
          name: 'lks-jabar-module-3',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 28
        }
      ]
    });

    new autoscaling.AutoScalingGroup(this, 'AutoScaling', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage()
    })

    this.vpc = vpc;

  }
}
