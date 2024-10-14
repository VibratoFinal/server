import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  Query,
  Request,
} from "@nestjs/common";
import { SearchDTO } from "./dto/search-single.dto";
import { AlbumDTO, ArtistDTO, TrackDTO } from "./dto/create-search.dto";
import { SearchsService } from "./searchs.service";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";
import { getUid } from "@/common/utils/helpers";

@Controller("search/single")
export class SearchsController {
  constructor(private readonly searchService: SearchsService) {}

  @Put("/track")
  @SkipAuthOptional()
  @HttpCode(202)
  async getTrack(@Request() req, @Body() body: SearchDTO): Promise<TrackDTO> {
    const uid = getUid(req);
    return this.searchService.getTrack(uid, body.type_id);
  }

  @Put("/track/:type_id")
  @SkipAuthOptional()
  @HttpCode(202)
  async getTrackByParam(
    @Request() req,
    @Param("type_id") type_id: string,
  ): Promise<TrackDTO> {
    const uid = getUid(req);
    return this.searchService.getTrack(uid, type_id);
  }

  @Put("/track_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async getTrackByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<TrackDTO> {
    const uid = getUid(req);
    return this.searchService.getTrack(uid, query.type_id);
  }

  @Put("/album")
  @SkipAuthOptional()
  @HttpCode(202)
  async getAlbum(@Request() req, @Body() body: SearchDTO): Promise<AlbumDTO> {
    const uid = getUid(req);
    return this.searchService.getAlbum(uid, body.type_id);
  }

  @Put("/album/:type_id")
  @SkipAuthOptional()
  @HttpCode(202)
  async getAlbumByParam(
    @Request() req,
    @Param("type_id") type_id: string,
  ): Promise<AlbumDTO> {
    const uid = getUid(req);
    return this.searchService.getAlbum(uid, type_id);
  }

  @Put("/album_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async getAlbumByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<AlbumDTO> {
    const uid = getUid(req);
    return this.searchService.getAlbum(uid, query.type_id);
  }

  @Put("/artist")
  @SkipAuthOptional()
  @HttpCode(202)
  async getArtist(@Request() req, @Body() body: SearchDTO): Promise<ArtistDTO> {
    const uid = getUid(req);
    return this.searchService.getArtist(uid, body.type_id);
  }

  @Put("/artist/:type_id")
  @SkipAuthOptional()
  @HttpCode(202)
  async getArtistByParam(
    @Request() req,
    @Param("type_id") type_id: string,
  ): Promise<ArtistDTO> {
    const uid = getUid(req);
    return this.searchService.getArtist(uid, type_id);
  }

  @Put("/artist_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async getArtistByQuery(
    @Request() req,
    @Query() query: SearchDTO,
  ): Promise<ArtistDTO> {
    const uid = getUid(req);
    return this.searchService.getArtist(uid, query.type_id);
  }
}
