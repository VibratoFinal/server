import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  Query,
  Request,
} from "@nestjs/common";
import { SearchDTO } from "./dto/search-spotify.dto";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { MusicsService } from "./musics.service";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";
import { getUid } from "@/common/utils/helpers";

@Controller("search")
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Put("/all")
  @SkipAuthOptional()
  async searchAll(
    @Request() req,
    @Body() body: SearchDTO,
  ): Promise<SearchAllDTO> {
    const uid = getUid(req);
    return this.musicsService.searchAll(uid, body.search_content);
  }

  @Put("/all/:search_content")
  @SkipAuthOptional()
  async searchAllByParam(
    @Request() req,
    @Param("search_content") search_content: string,
  ): Promise<SearchAllDTO> {
    const uid = getUid(req);
    return this.musicsService.searchAll(uid, search_content);
  }

  @Put("/all_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchAllByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<SearchAllDTO> {
    const uid = getUid(req);
    return this.musicsService.searchAll(uid, query.search_content);
  }

  @Put("/tracks")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchTrack(
    @Request() req,
    @Body() body: SearchDTO,
  ): Promise<TrackDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchTrack(uid, body.search_content);
  }

  @Put("/tracks/:search_content")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchTrackByParam(
    @Request() req,
    @Param("search_content") search_content: string,
  ): Promise<TrackDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchTrack(uid, search_content);
  }

  @Put("/tracks_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchTrackByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<TrackDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchTrack(uid, query.search_content);
  }

  @Put("/artists")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchArtist(
    @Request() req,
    @Body() body: SearchDTO,
  ): Promise<ArtistDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchArtist(uid, body.search_content);
  }

  @Put("/artists/:search_content")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchArtistByParam(
    @Request() req,
    @Param("search_content") search_content: string,
  ): Promise<ArtistDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchArtist(uid, search_content);
  }

  @Put("/artists_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchArtistByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<ArtistDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchArtist(uid, query.search_content);
  }

  @Put("/albums")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchAlbum(
    @Request() req,
    @Body() body: SearchDTO,
  ): Promise<AlbumDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchAlbum(uid, body.search_content);
  }

  @Put("/albums/:search_content")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchAlbumByParam(
    @Request() req,
    @Param("search_content") search_content: string,
  ): Promise<AlbumDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchAlbum(uid, search_content);
  }

  @Put("/albums_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async searchAlbumByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<AlbumDTO[]> {
    const uid = getUid(req);
    return this.musicsService.searchAlbum(uid, query.search_content);
  }
}
