import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Images } from "./entity/images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
