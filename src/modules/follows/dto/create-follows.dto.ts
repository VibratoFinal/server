import { IsNotEmpty, IsString } from "class-validator";

export class CreateFollowDTO {
  @IsNotEmpty()
  @IsString()
  type_id: string;
}
