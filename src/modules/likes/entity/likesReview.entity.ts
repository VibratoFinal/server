import { Users } from "src/modules/auth/entity/auth.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class LikesReviews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @Column()
  review_id: number;
}
