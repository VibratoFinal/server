import { Module } from "@nestjs/common";
import { ImagesController } from "./profile-images.controller";
import { ProfileImagesService } from "./profile-images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/profile-images.entity";
import { Users } from "../auth/entity/auth.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileImages, Users])],
  controllers: [ImagesController],
  providers: [ProfileImagesService],
})
export class ImagesModule {}
