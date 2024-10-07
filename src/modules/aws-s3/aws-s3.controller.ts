import { SkipAuth } from "@/common/decorators/skip-auth.decorator";
import { Controller, Get } from "@nestjs/common";
import { AwsS3Service } from "./aws-s3.service";

@Controller("aws-s3")
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}
  @Get()
  @SkipAuth()
  async getAllComments() {
    return await this.awsS3Service.getProfileImage();
  }
}
