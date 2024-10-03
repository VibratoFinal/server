import { Body, Controller, Get, Param, Query } from "@nestjs/common";
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

  @Get("/all")
  @SkipAuth()
  async searchAll(@Body() body: SearchDTO): Promise<SearchAllDTO> {
    return this.musicsService.searchAll(body.search_content);
  }

  @Get("/all/:search_content")
  @SkipAuth()
  async searchAllByParam(
    @Param("search_content") search_content: string,
  ): Promise<SearchAllDTO> {
    return this.musicsService.searchAll(search_content);
  }

  @Get("/all_query")
  @SkipAuth()
  async searchAllByQuery(@Query() query: SearchDTO): Promise<SearchAllDTO> {
    return this.musicsService.searchAll(query.search_content);
  }

  @Get("/tracks")
  @SkipAuth()
  async searchTrack(@Body() body: SearchDTO): Promise<TrackDTO[]> {
    return this.musicsService.searchTrack(body.search_content);
  }

  @Get("/tracks/:search_content")
  @SkipAuth()
  async searchTrackByParam(
    @Param("search_content") search_content: string,
  ): Promise<TrackDTO[]> {
    return this.musicsService.searchTrack(search_content);
  }

  @Get("/tracks_query")
  @SkipAuth()
  async searchTrackByQuery(@Query() query: SearchDTO): Promise<TrackDTO[]> {
    return this.musicsService.searchTrack(query.search_content);
  }

  @Get("/artists")
  @SkipAuth()
  async searchArtist(@Body() body: SearchDTO): Promise<ArtistDTO[]> {
    return this.musicsService.searchArtist(body.search_content);
  }

  @Get("/artists/:search_content")
  @SkipAuth()
  async searchArtistByParam(
    @Param("search_content") search_content: string,
  ): Promise<ArtistDTO[]> {
    return this.musicsService.searchArtist(search_content);
  }

  @Get("/artists_query")
  @SkipAuth()
  async searchArtistByQuery(@Query() query: SearchDTO): Promise<ArtistDTO[]> {
    return this.musicsService.searchArtist(query.search_content);
  }

  @Get("/albums")
  @SkipAuth()
  async searchAlbum(@Body() body: SearchDTO): Promise<AlbumDTO[]> {
    return this.musicsService.searchAlbum(body.search_content);
  }

  @Get("/albums/:search_content")
  @SkipAuth()
  async searchAlbumByParam(
    @Param("search_content") search_content: string,
  ): Promise<AlbumDTO[]> {
    return this.musicsService.searchAlbum(search_content);
  }

  @Get("/albums_query")
  @SkipAuth()
  async searchAlbumByQuery(@Query() query: SearchDTO): Promise<AlbumDTO[]> {
    return this.musicsService.searchAlbum(query.search_content);
  }
}
