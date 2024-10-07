import { IsNotEmpty, IsString } from "class-validator";

export class GetPresignedUrl {
  @IsString()
  @IsNotEmpty()
  filename: string;
}
