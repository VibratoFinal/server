import { Follows } from "src/follows/entity/follows.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  uid: number;

  @Column()
  profile_image_URL: string;

  @Column()
  nickname: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Follows, (follows) => follows.user_uid)
  follows: Follows[];
}
