import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfileImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", comment: "프로필 이미지 URL" })
  profile_image_URL: string;
}
