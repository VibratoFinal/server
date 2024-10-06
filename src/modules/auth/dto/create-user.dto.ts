import { IsString } from "class-validator";

export class UserResponseDTO {
  @IsString()
  profileImage: string;

  @IsString()
  nickname: string;
}
