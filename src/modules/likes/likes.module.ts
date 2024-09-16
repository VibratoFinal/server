import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikesComments } from "./entity/likesComment.entity";
import { LikesReviews } from "./entity/likesReview.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LikesComments, LikesReviews])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
