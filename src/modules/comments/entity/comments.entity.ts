import { LikesComments } from "@/modules/likes/entity/likesComment.entity";
import { Reviews } from "@modules/reviews/entity/reviews.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  user_uid: string;

  @Column()
  nickname: string;

  @Column()
  contents: string;

  @ManyToOne(() => Reviews, review => review.comments)
  @JoinColumn({ name: "review_id" })
  review: Reviews;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => LikesComments, likeComment => likeComment.comment, {
    eager: true,
  })
  likes: LikesComments[];
}
