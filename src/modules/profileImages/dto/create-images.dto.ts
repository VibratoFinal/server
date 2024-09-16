import { IsString } from "class-validator";

export class CreateImageDTO {
  @IsString()
  profile_image_URL: string;
}
