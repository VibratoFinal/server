import { Module } from "@nestjs/common";
import { ChartsController } from "./charts.controller";
import { ChartsService } from "./charts.service";
import { SpotifyService } from "../musics/spotify.service";

@Module({
  controllers: [ChartsController],
  providers: [ChartsService, SpotifyService],
})
export class ChartsModule {}
