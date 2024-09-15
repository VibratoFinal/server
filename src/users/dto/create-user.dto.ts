import { IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
  @IsNumber()
  image_id: number;

  @IsString()
  nickname: string;
}
