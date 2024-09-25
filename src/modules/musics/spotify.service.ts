import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as qs from "qs";
import {
  transformAlbums,
  transformArtists,
  transformTracks,
  transformAll,
} from "./utils/transform";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
// import { SongsDetailService } from "./songsdetail.service";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    // private readonly songsDetailService: SongsDetailService,
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

  public async searchAll(body: string): Promise<SearchAllDTO> {
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
          offset: "5",
        },
      });

      return transformAll(response.data);
    } catch (err) {
      console.error("Failed to Search Spotify All : ", err);
    }
  }

  public async searchTrack(body: string): Promise<TrackDTO[]> {
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
          offset: "5",
        },
      });

      const tracks = transformTracks(response.data.tracks.items);
      // const tracksInfoPromises = tracks.map(track =>
      //   this.songsDetailService.getTracksInfo(track.id),
      // );
      // await Promise.all(tracksInfoPromises);

      return tracks;
    } catch (err) {
      console.error("Failed to Search Spotify Track : ", err);
    }
  }

  public async searchArtist(body: string): Promise<ArtistDTO[]> {
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
          offset: "5",
        },
      });

      return transformArtists(response.data.artists.items);
    } catch (err) {
      console.error("Failed to Search Spotify Artist : ", err);
    }
  }

  public async searchAlbum(body: string): Promise<AlbumDTO[]> {
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
        },
      });

      return transformAlbums(response.data.albums.items);
    } catch (err) {
      console.error("Failed to Search Spotify Album : ", err);
    }
  }
}
