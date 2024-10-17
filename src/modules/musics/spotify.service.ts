import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as qs from "qs";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { MusicsRepository } from "./musics.repository";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly musicsRepository: MusicsRepository,
  ) {}

  public async getAccessToken(): Promise<string> {
    try {
      const url = "https://accounts.spotify.com/api/token";
      const response = await axios.post(
        url,
        qs.stringify({ grant_type: "client_credentials" }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                `${this.configService.get("SPOTIFY_CLIENT_ID")}:${this.configService.get("SPOTIFY_CLIENT_SECRET")}`,
              ).toString("base64"),
          },
        },
      );
      return response.data.access_token;
    } catch (err) {
      console.error("Failed to Get Spotify Access Token : ", err);
    }
  }

  public async searchAll(uid: string, body: string): Promise<SearchAllDTO> {
    try {
      const accessToken = await this.getAccessToken();
      const url = "https://api.spotify.com/v1/search";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: body,
          type: "track,artist,album",
          market: "KR",
          limit: "20",
        },
      });
      return await this.musicsRepository.transformAll(uid, response.data);
    } catch (err) {
      console.error("Failed to Search Spotify All : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search spotify all",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchTrack(uid: string, body: string): Promise<TrackDTO[]> {
    try {
      const accessToken = await this.getAccessToken();
      const url = "https://api.spotify.com/v1/search";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: body,
          type: "track",
          market: "KR",
          limit: "20",
        },
      });

      return await this.musicsRepository.transformTracks(
        uid,
        response.data.tracks.items,
      );
    } catch (err) {
      console.error("Failed to Search Spotify Track : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search spotify track",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchArtist(uid: string, body: string): Promise<ArtistDTO[]> {
    try {
      const accessToken = await this.getAccessToken();
      const url = "https://api.spotify.com/v1/search";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: body,
          type: "artist",
          market: "KR",
          limit: "20",
        },
      });

      return await this.musicsRepository.transformArtists(
        uid,
        response.data.artists.items,
      );
    } catch (err) {
      console.error("Failed to Search Spotify Artist : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search spotify artist",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async searchAlbum(uid: string, body: string): Promise<AlbumDTO[]> {
    try {
      const accessToken = await this.getAccessToken();
      const url = "https://api.spotify.com/v1/search";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: body,
          type: "album",
          market: "KR",
          limit: "20",
        },
      });

      return await this.musicsRepository.transformAlbums(
        uid,
        response.data.albums.items,
      );
    } catch (err) {
      console.error("Failed to Search Spotify Album : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to search spotify album",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
