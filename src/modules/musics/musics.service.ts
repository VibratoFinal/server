import { Injectable } from "@nestjs/common";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { SpotifyService } from "./spotify.service";

@Injectable()
export class MusicsService {
  constructor(private readonly spotifyService: SpotifyService) {}

  public async searchAll(body: string): Promise<SearchAllDTO> {
    return this.spotifyService.searchAll(body);
  }

  public async searchTrack(body: string): Promise<TrackDTO[]> {
    return this.spotifyService.searchTrack(body);
  }

  public async searchArtist(body: string): Promise<ArtistDTO[]> {
    return this.spotifyService.searchArtist(body);
  }

  public async searchAlbum(body: string): Promise<AlbumDTO[]> {
    return this.spotifyService.searchAlbum(body);
  }
}
