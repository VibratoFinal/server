import { IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
  @IsNumber()
  uid: number;

  @IsString()
  profile_image_URL: string;

  @IsString()
  nickname: string;
}
