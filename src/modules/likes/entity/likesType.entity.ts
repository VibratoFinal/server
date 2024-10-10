import { Users } from "@modules/auth/entity/auth.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class LikesType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @Column()
  type_id: string;

  @CreateDateColumn()
  created_at: Date;
}
