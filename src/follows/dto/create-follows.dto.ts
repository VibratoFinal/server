import { IsNumber, IsString } from "class-validator";

export class FindFollowDTO {
  @IsString()
  user_uid: string;
}

export class CreateFollowDTO extends FindFollowDTO {
  @IsNumber()
  album_id: number;
}
