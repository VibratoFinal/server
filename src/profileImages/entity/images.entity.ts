import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  profile_images_id: number;

  @Column({ type: "varchar", comment: "프로필 이미지 URL" })
  profile_image_URL: string;
}
