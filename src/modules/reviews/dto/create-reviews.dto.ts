import { IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {
  @IsNumber()
  rated: number;

  @IsString()
  contents: string;

  @IsString()
  type_id: string;
}
