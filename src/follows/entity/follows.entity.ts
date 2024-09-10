import { User } from "src/users/entity/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Follows {
  @PrimaryColumn()
  album_id: number;

  @ManyToOne(() => User, (user) => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: User;
}
