import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GetPresignedUrl } from "./dto/getPresignedUrl.dto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class AwsS3Service {
  constructor(
    @Inject("S3_CLIENT")
    private readonly s3Client: S3Client,

    private readonly configService: ConfigService,
  ) {}

  async getSignedUrlForUserProfileImage(
    getSignedUrlDto: GetPresignedUrl,
  ): Promise<string> {
    const filename = `${Date.now()}${getSignedUrlDto.filename}`;

    const command = new GetObjectCommand({
      Bucket: this.configService.get("AWS_BUCKET"),
      Key: filename,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60, // seconds
    });

    return signedUrl;
  }

  async getProfileImage() {
    const command = new GetObjectCommand({
      Bucket: this.configService.get("AWS_BUCKET"),
      Key: "github-mark.png",
    });

    try {
      const response = await this.s3Client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
}
