import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  user_uid: string;

  @Column()
  contents: string;

  @Column()
  review_id: number;

  @CreateDateColumn()
  created_at: Date;
}
