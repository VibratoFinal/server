import { Module } from "@nestjs/common";
import { SearchsService } from "./searchs.service";
import { SearchsController } from "./searchs.controller";
import { SpotifyService } from "../musics/spotify.service";
import { ReivewsModule } from "../reviews/reviews.module";
import { SearchsRepository } from "./searchs.repository";
import { MusicsRepository } from "../musics/musics.repository";

@Module({
  imports: [ReivewsModule],
  providers: [
    SearchsService,
    SpotifyService,
    SearchsRepository,
    MusicsRepository,
  ],
  controllers: [SearchsController],
})
export class SearchsModule {}
