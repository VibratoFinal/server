import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikesComments } from "./entity/likesComment.entity";
import { LikesReviews } from "./entity/likesReview.entity";
import { Users } from "@/modules/auth/entity/auth.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
import { Reviews } from "../reviews/entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { LikesType } from "./entity/likesType.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikesComments,
      LikesReviews,
      LikesType,
      Users,
      Reviews,
      Comments,
    ]),
    FirebaseModule,
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
