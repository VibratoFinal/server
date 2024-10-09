import { IsNumber, IsString } from "class-validator";

export class CreateLikesReviewDTO {
  @IsNumber()
  review_id: number;
}

export class CreateLikesCommentDTO extends CreateLikesReviewDTO {
  @IsNumber()
  comment_id: number;
}

export class CreateLikesTypeDTO {
  @IsString()
  type_id: string;
}
