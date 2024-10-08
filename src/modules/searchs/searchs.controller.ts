import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { SearchDTO } from "./dto/search-single.dto";
import { AlbumDTO, ArtistDTO, TrackDTO } from "./dto/create-search.dto";
import { SearchsService } from "./searchs.service";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

@Controller("search/single")
export class SearchsController {
  constructor(private readonly searchService: SearchsService) {}

  @Get("/track")
  @SkipAuth()
  async getTrack(@Body() body: SearchDTO): Promise<TrackDTO> {
    return this.searchService.getTrack(body.type_id);
  }

  @Get("/track/:type_id")
  @SkipAuth()
  async getTrackByParam(@Param("type_id") type_id: string): Promise<TrackDTO> {
    return this.searchService.getTrack(type_id);
  }

  @Get("/track_query")
  @SkipAuth()
  async getTrackByQuery(@Query() query: SearchDTO): Promise<TrackDTO> {
    return this.searchService.getTrack(query.type_id);
  }

  @Get("/album")
  @SkipAuth()
  async getAlbum(@Body() body: SearchDTO): Promise<AlbumDTO> {
    return this.searchService.getAlbum(body.type_id);
  }

  @Get("/album/:type_id")
  @SkipAuth()
  async getAlbumByParam(@Param("type_id") type_id: string): Promise<AlbumDTO> {
    return this.searchService.getAlbum(type_id);
  }

  @Get("/album_query")
  @SkipAuth()
  async getAlbumByQuery(@Query() query: SearchDTO): Promise<AlbumDTO> {
    return this.searchService.getAlbum(query.type_id);
  }

  @Get("/artist")
  @SkipAuth()
  async getArtist(@Body() body: SearchDTO): Promise<ArtistDTO> {
    return this.searchService.getArtist(body.type_id);
  }

  @Get("/artist/:type_id")
  @SkipAuth()
  async getArtistByParam(
    @Param("type_id") type_id: string,
  ): Promise<ArtistDTO> {
    return this.searchService.getArtist(type_id);
  }

  @Get("/artist_query")
  @SkipAuth()
  async getArtistByQuery(@Query() query: SearchDTO): Promise<ArtistDTO> {
    return this.searchService.getArtist(query.type_id);
  }
}
