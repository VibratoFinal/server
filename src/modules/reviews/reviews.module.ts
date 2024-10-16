import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
import { Comments } from "../comments/entity/comments.entity";
import { Users } from "../auth/entity/auth.entity";
import { LikesModule } from "../likes/likes.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews, Comments, Users]),
    FirebaseModule,
    LikesModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReivewsModule {}
