import { Module } from "@nestjs/common";
import { ChartsController } from "./charts.controller";
import { ChartsService } from "./charts.service";
import { SpotifyService } from "../musics/spotify.service";
import { ReivewsModule } from "../reviews/reviews.module";
import { ChartsRepository } from "./charts.repository";
import { MusicsRepository } from "../musics/musics.repository";

@Module({
  imports: [ReivewsModule],
  controllers: [ChartsController],
  providers: [
    ChartsService,
    SpotifyService,
    ChartsRepository,
    MusicsRepository,
  ],
})
export class ChartsModule {}
