import { Module } from "@nestjs/common";
import { ImagesController } from "./profile-images.controller";
import { ProfileImagesService } from "./profile-images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/profile-images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileImages])],
  controllers: [ImagesController],
  providers: [ProfileImagesService],
})
export class ImagesModule {}
