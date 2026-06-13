import { EcsApplication } from 'aws-cdk-lib/aws-codedeploy';
import { Instance, InstanceClass, InstanceSize, InstanceType, KeyPair, MachineImage, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { Cluster, Compatibility, ContainerImage, FargateTaskDefinition, TaskDefinition } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);



        const vpc = Vpc.fromLookup(
            this,
            "VPC",
            {
                vpcId: "vpc-07c74926639850a09",
            }
        )

        const registry = Repository.fromRepositoryName(this, "repo", "repositorio-teste")

        const cluster = new Cluster(
            this,
            "cluster-teste",
            {
                vpc,
                clusterName: "cluster-teste",
            }
        )

        const fargate = new ApplicationLoadBalancedFargateService(
            this, 
            "fargate", {
                cluster,
                
                assignPublicIp: true,
                publicLoadBalancer: true,
                listenerPort: 80,
                
              taskImageOptions: {
                    containerName:"container-teste",
                    image: ContainerImage.fromRegistry(
                        "140191121263.dkr.ecr.us-east-1.amazonaws.com/repositorio-teste:latest"
                    ),
                    containerPort: 3000
                },
                serviceName: "service-teste",
                desiredCount: 2,
                cpu: 512,
                memoryLimitMiB: 1024,
            })

        fargate.taskDefinition.executionRole?.addManagedPolicy(
            ManagedPolicy.fromAwsManagedPolicyName(
                "service-role/AmazonECSTaskExecutionRolePolicy"
          ),
          
        )

        // const keyPair = KeyPair.fromKeyPairName(
        //   this,
        //   "ssh-apikey",
        //   "api-ec2-key"
        // )

        // const instance = new Instance(
        //   this, 
        //   "ec2-teste",
        //   {
        //     vpc, 
        //     keyPair,
        //     vpcSubnets: {subnetType: SubnetType.PUBLIC},
        //     instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
        //     machineImage: MachineImage.genericLinux({
        //       "us-east-1": "ami-0e43812467b61e173",
        //     }),
        //     associatePublicIpAddress: true,
        //     securityGroup: SecurityGroup.fromLookupById(
        //       this, 
        //       "API-SG",
        //       "sg-0f1e6e939d193a7ad"
        //     ),

        //   }
        // )

    }
}
