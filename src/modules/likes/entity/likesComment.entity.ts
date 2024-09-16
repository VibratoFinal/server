import { Column, Entity } from "typeorm";
import { LikesReviews } from "./likesReview.entity";

@Entity()
export class LikesComments extends LikesReviews {
  @Column()
  comment_id: number;
}
