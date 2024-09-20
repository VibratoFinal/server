import { IsNumber } from "class-validator";

export class CreateLikesReviewDTO {
  @IsNumber()
  review_id: number;
}

export class CreateLikesCommentDTO extends CreateLikesReviewDTO {
  @IsNumber()
  comment_id: number;
}
