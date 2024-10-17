import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comments } from "./entity/comments.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "@modules/reviews/entity/reviews.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
import { Users } from "../auth/entity/auth.entity";
import { LikesModule } from "../likes/likes.module";
import { ReivewsModule } from "../reviews/reviews.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, Reviews, Users]),
    FirebaseModule,
    LikesModule,
    ReivewsModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
