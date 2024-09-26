import { Body, Controller, Get } from "@nestjs/common";
import { SearchDTO } from "./dto/search-spotify.dto";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { MusicsService } from "./musics.service";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

@Controller("search")
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Get("")
  @SkipAuth()
  async searchAll(@Body() body: SearchDTO): Promise<SearchAllDTO> {
    return this.musicsService.searchAll(body.search_content);
  }

  @Get("/tracks")
  @SkipAuth()
  async searchTrack(@Body() body: SearchDTO): Promise<TrackDTO[]> {
    return this.musicsService.searchTrack(body.search_content);
  }

  @Get("/artists")
  @SkipAuth()
  async searchArtist(@Body() body: SearchDTO): Promise<ArtistDTO[]> {
    return this.musicsService.searchArtist(body.search_content);
  }

  @Get("/albums")
  @SkipAuth()
  async searchAlbum(@Body() body: SearchDTO): Promise<AlbumDTO[]> {
    return this.musicsService.searchAlbum(body.search_content);
  }
}
