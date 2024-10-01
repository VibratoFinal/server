import { Users } from "@modules/auth/entity/auth.entity";
import { Reviews } from "@modules/reviews/entity/reviews.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["user_uid", "review_id"])
export class LikesReviews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @ManyToOne(() => Reviews, review => review.review_id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "review_id" })
  review_id: number;
}
