import { Module } from "@nestjs/common";
import { AwsS3Service } from "./aws-s3.service";
import { ConfigService } from "@nestjs/config";
import { S3Client } from "@aws-sdk/client-s3";
import { AwsS3Controller } from "./aws-s3.controller";

@Module({
  imports: [],
  controllers: [AwsS3Controller],
  providers: [
    {
      provide: "S3_CLIENT",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.get("AWS_REGION"),
          credentials: {
            accessKeyId: configService.get("AWS_ACCESS_KEY_ID")!,
            secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
          },
        });
      },
    },
    AwsS3Service,
  ],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
