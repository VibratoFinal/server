import { Body, Controller, Get } from "@nestjs/common";
import { SearchDTO } from "./dto/search-single.dto";
import { AlbumDTO, ArtistDTO, TrackDTO } from "./dto/create-search.dto";
import { SearchsService } from "./searchs.service";

@Controller("search/single")
export class SearchsController {
  constructor(private readonly searchService: SearchsService) {}

  @Get("/track")
  async getTrack(@Body() body: SearchDTO): Promise<TrackDTO> {
    return this.searchService.getTrack(body.type_id);
  }

  @Get("/album")
  async getAlbum(@Body() body: SearchDTO): Promise<AlbumDTO> {
    return this.searchService.getAlbum(body.type_id);
  }

  @Get("/artist")
  async getArtist(@Body() body: SearchDTO): Promise<ArtistDTO> {
    return this.searchService.getArtist(body.type_id);
  }
}
