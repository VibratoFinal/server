import { Comments } from "@/modules/comments/entity/comments.entity";
import { LikesReviews } from "@/modules/likes/entity/likesReview.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  user_uid: string;

  @Column()
  rated: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  type_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comments, comment => comment.review, { eager: true })
  comments: Comments[];

  @OneToMany(() => LikesReviews, likeReview => likeReview.review, {
    eager: true,
  })
  likes: LikesReviews[];
}
