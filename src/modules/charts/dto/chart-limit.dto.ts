import { IsNumber } from "class-validator";

export class LimitDTO {
  @IsNumber()
  limit: number;
}
