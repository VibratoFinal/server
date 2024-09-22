import { Users } from "src/modules/auth/entity/auth.entity";
import { Reviews } from "src/modules/reviews/entity/reviews.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
