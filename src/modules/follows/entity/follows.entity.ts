import { Users } from "@modules/auth/entity/auth.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["user_uid", "type_id"])
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @Column()
  type_id: string;
}
