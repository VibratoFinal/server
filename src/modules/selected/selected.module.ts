import { Module } from "@nestjs/common";
import { SelectedService } from "./selected.service";
import { SelectedController } from "./selected.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
import { LikesType } from "../likes/entity/likesType.entity";
import { Users } from "../auth/entity/auth.entity";
import { SpotifyService } from "../musics/spotify.service";
import { MusicsRepository } from "../musics/musics.repository";
import { ReviewsService } from "../reviews/reviews.service";
import { LikesService } from "../likes/likes.service";
import { Reviews } from "../reviews/entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { LikesReviews } from "../likes/entity/likesReview.entity";
import { LikesComments } from "../likes/entity/likesComment.entity";
import { SearchsRepository } from "../searchs/searchs.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reviews,
      LikesType,
      Users,
      Comments,
      LikesReviews,
      LikesComments,
    ]),
    FirebaseModule,
  ],
  providers: [
    SelectedService,
    SpotifyService,
    MusicsRepository,
    ReviewsService,
    LikesService,
    SearchsRepository,
  ],
  controllers: [SelectedController],
})
export class SelectedModule {}
