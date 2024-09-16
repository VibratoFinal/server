import { IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {
  /// 프론트 연결 후 사용
  //   @IsNotEmpty()
  //   user_uid: string;

  @IsNumber()
  rated: number;

  @IsString()
  contents: string;

  @IsNumber()
  type_id: number;
}
