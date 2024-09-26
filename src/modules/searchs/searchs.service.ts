import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SpotifyService } from "../musics/spotify.service";
import axios from "axios";
import {
  transformAlbum,
  transformArtist,
  transformTrack,
} from "./util/transform";
import { AlbumDTO, ArtistDTO, TrackDTO } from "./dto/create-search.dto";

@Injectable()
export class SearchsService {
  constructor(private readonly spotifyService: SpotifyService) {}

  public async getArtist(artist_id: string): Promise<ArtistDTO> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const url = `https://api.spotify.com/v1/artists/${artist_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return transformArtist(response.data);
    } catch (err) {
      console.error("Failed to Get Artist by Id : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get artist by id",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAlbum(album_id: string): Promise<AlbumDTO> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const url = `https://api.spotify.com/v1/albums/${album_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return transformAlbum(response.data);
    } catch (err) {
      console.error("Failed to Get Album by Id : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get album by id",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getTrack(track_id: string): Promise<TrackDTO> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const url = `https://api.spotify.com/v1/tracks/${track_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return transformTrack(response.data);
    } catch (err) {
      console.error("Failed to Get Track by Id : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get track by id",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
