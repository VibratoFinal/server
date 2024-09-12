import { Users } from "src/users/entity/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Follows {
  // artist, albums id
  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @Column()
  type_id: number;
}
