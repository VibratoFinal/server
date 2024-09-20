import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comments } from "./entity/comments.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "src/modules/reviews/entity/reviews.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Reviews])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
