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
@Unique(["review"])
export class LikesReviews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user: Users;

  @ManyToOne(() => Reviews, review => review.review_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "review_id" })
  review: Reviews;
}
