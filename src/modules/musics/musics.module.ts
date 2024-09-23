import { Module } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
// import { SongsDetailService } from "./songsdetail.service";

@Module({
  providers: [SpotifyService, MusicsService],
  controllers: [MusicsController],
})
export class MusicsModule {}
