import { IsString } from "class-validator";

export class SearchDTO {
  @IsString()
  search_content: string;
}
