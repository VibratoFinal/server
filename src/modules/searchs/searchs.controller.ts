import { Body, Controller, Get } from "@nestjs/common";
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

  @Get("/album")
  @SkipAuth()
  async getAlbum(@Body() body: SearchDTO): Promise<AlbumDTO> {
    return this.searchService.getAlbum(body.type_id);
  }

  @Get("/artist")
  @SkipAuth()
  async getArtist(@Body() body: SearchDTO): Promise<ArtistDTO> {
    return this.searchService.getArtist(body.type_id);
  }
}
