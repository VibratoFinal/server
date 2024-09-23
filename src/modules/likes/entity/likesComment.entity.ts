import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { LikesReviews } from "./likesReview.entity";
import { Comments } from "@modules/comments/entity/comments.entity";

@Entity()
export class LikesComments extends LikesReviews {
  @ManyToOne(() => Comments, comment => comment.comment_id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "comment_id" })
  comment_id: number;
}
