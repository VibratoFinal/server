import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, comment: "유저 아이디" })
  uid: string;

  @Column({ type: "varchar", comment: "유저 이미지" })
  profileImage: string;

  @Column({ type: "varchar", comment: "유저 닉네임" })
  nickname: string;

  @CreateDateColumn({ name: "created_at", comment: "생성일" })
  created_at: Date;
}
