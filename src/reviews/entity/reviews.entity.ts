import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
}
