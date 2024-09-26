import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    try {
      return this.spotifyService.searchAll(body);
    } catch (err) {
      console.error("Failed to Search All : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search all",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchTrack(body: string): Promise<TrackDTO[]> {
    try {
      return this.spotifyService.searchTrack(body);
    } catch (err) {
      console.error("Failed to Search Track : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search track",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchArtist(body: string): Promise<ArtistDTO[]> {
    try {
      return this.spotifyService.searchArtist(body);
    } catch (err) {
      console.error("Failed to Search Artist : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search artist",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchAlbum(body: string): Promise<AlbumDTO[]> {
    try {
      return this.spotifyService.searchAlbum(body);
    } catch (err) {
      console.error("Failed to Search Album : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search album",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
