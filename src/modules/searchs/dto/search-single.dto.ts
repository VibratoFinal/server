import { IsString } from "class-validator";

export class SearchDTO {
  @IsString()
  type_id: string;
}
