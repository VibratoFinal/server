import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikesReviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_uid: string;

  @Column()
  review_id: number;
}
