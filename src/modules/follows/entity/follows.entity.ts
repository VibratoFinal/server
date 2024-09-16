import { Users } from "src/modules/auth/entity/auth.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Follows {
  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.uid, { eager: true })
  @JoinColumn({ name: "user_uid" })
  user_uid: Users;

  @Column()
  type_id: number;
}
