import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { LikesReviews } from "./likesReview.entity";
import { Comments } from "@modules/comments/entity/comments.entity";

@Entity()
@Unique(["comment_id"])
export class LikesComments extends LikesReviews {
  @ManyToOne(() => Comments, comment => comment.comment_id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "comment_id" })
  comment_id: number;
}
