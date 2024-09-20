import { IsNumber } from "class-validator";

export class CreateFollowDTO {
  // 프론트 연결 후 user_uid 필요
  @IsNumber()
  type_id: number;
}
