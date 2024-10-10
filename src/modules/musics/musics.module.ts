import { Module } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
import { ReivewsModule } from "../reviews/reviews.module";
import { MusicsRepository } from "./musics.repository";
import { LikesModule } from "../likes/likes.module";

@Module({
  imports: [ReivewsModule, LikesModule],
  providers: [SpotifyService, MusicsService, MusicsRepository],
  controllers: [MusicsController],
  exports: [MusicsRepository],
})
export class MusicsModule {}
