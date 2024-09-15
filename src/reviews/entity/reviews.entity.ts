import { Comments } from "src/comments/entity/comments.entity";
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
  contents: string;

  @Column()
  type_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comments, (comment) => comment.review, { eager: true })
  comments: Comments[];
}
