import { IsString } from "class-validator";

export class LimitDTO {
  @IsString()
  limit: string;

  @IsString()
  offset: string;
}
