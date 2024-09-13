import { Images } from "src/profileImages/entity/images.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, comment: "유저 아이디" })
  uid: string;

  @ManyToOne(() => Images, (image) => image.profile_image_URL, { eager: true })
  @JoinColumn({ name: "profile_image_id" })
  @Column({ type: "int", comment: "이미지 아이디" })
  profile_image_id: number;

  @Column({ type: "varchar", comment: "유저 닉네임" })
  nickname: string;

  @CreateDateColumn({ name: "create_at", comment: "생성일" })
  created_at: Date;
}
