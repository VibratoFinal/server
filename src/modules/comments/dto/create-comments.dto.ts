import { IsString } from "class-validator";

export class CreateCommentDTO {
  @IsString()
  contents: string;
}
