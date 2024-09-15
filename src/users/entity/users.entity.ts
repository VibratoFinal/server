import { ProfileImages } from "src/profileImages/entity/images.entity";
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

  @ManyToOne(() => ProfileImages, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "profile_image_id" })
  profileImage: ProfileImages;

  @Column({ type: "varchar", comment: "유저 닉네임" })
  nickname: string;

  @CreateDateColumn({ name: "create_at", comment: "생성일" })
  created_at: Date;
}
