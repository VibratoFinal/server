import { Comments } from "@/modules/comments/entity/comments.entity";
import { LikesReviews } from "@/modules/likes/entity/likesReview.entity";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateReviewDTO {
  @IsNumber()
  rated: number;

  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsString()
  type_id: string;
}

export class CreateResponseReviewDTO {
  @IsNumber()
  review_id: number;

  @IsString()
  user_uid: string;

  @IsString()
  rated: number;

  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsString()
  type_id: string;

  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;

  @IsString()
  comments: Array<Comments>;

  @IsArray()
  likes: Array<LikesReviews>;

  @IsBoolean()
  liked: boolean;
}
