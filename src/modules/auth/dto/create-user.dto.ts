import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsNumber()
  profileImageId: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;
}
