import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Comments } from "@modules/comments/entity/comments.entity";
import { Users } from "@modules/auth/entity/auth.entity";
import { Reviews } from "@modules/reviews/entity/reviews.entity";
@Entity()
@Unique(["comment_id"])
export class LikesComments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @ManyToOne(() => Reviews, review => review.review_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "review_id" })
  review_id: Reviews;

  @ManyToOne(() => Comments, comment => comment.comment_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "comment_id" })
  comment_id: Comments;
}
