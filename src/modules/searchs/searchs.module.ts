import { Module } from "@nestjs/common";
import { SearchsService } from "./searchs.service";
import { SearchsController } from "./searchs.controller";
import { SpotifyService } from "../musics/spotify.service";

@Module({
  providers: [SearchsService, SpotifyService],
  controllers: [SearchsController],
})
export class SearchsModule {}
