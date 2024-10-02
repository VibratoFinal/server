import { IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {
  @IsNumber()
  rated: number;

  @IsString()
  contents: string;

  @IsNumber()
  type_id: number;
}
