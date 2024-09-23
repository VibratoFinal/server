import { Module } from "@nestjs/common";
import { SearchsService } from "./searchs.service";
import { SearchsController } from "./searchs.controller";
import { SpotifyService } from "../musics/spotify.service";
import { SongsDetailService } from "../musics/songsdetail.service";

@Module({
  providers: [SearchsService, SpotifyService, SongsDetailService],
  controllers: [SearchsController],
})
export class SearchsModule {}
