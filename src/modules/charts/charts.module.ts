import { Module } from "@nestjs/common";
import { ChartsController } from "./charts.controller";
import { ChartsService } from "./charts.service";
import { SpotifyService } from "../musics/spotify.service";
import { SongsDetailService } from "../musics/songsdetail.service";

@Module({
  controllers: [ChartsController],
  providers: [ChartsService, SpotifyService, SongsDetailService],
})
export class ChartsModule {}
