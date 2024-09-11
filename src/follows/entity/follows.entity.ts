import { Users } from "src/users/entity/users.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Follows {
  // artist, albums id
  @PrimaryColumn()
  type_id: number;

  @ManyToOne(() => Users, (user) => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;
}
