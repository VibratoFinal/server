import { IsString } from "class-validator";

export class CreateCommentDTO {
  /// 프론트 연결 후 사용
  //   @IsNotEmpty()
  //   user_uid: string;

  @IsString()
  contents: string;
}
