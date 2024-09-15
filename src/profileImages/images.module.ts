import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ProfileImagesService } from "./images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileImages])],
  controllers: [ImagesController],
  providers: [ProfileImagesService],
})
export class ImagesModule {}
