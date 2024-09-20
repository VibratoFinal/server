import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { transformCharts } from "./utils/transform";
import { ChartsDTO } from "./dto/create-charts.dto";
import { SpotifyService } from "../musics/spotify.service";

@Injectable()
export class ChartsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly spotifyService: SpotifyService,
  ) {}

  public async getGlobal50(): Promise<ChartsDTO[]> {
    const accessToken = await this.spotifyService.getAccessToken();
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const charts = transformCharts(response.data.tracks.items);
    return charts;
  }

  public async getKorea50(): Promise<ChartsDTO[]> {
    const accessToken = await this.spotifyService.getAccessToken();
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbNxXF4SkHj9F";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const charts = transformCharts(response.data.tracks.items);
    return charts;
  }

  public async getGlobal50Weekly(): Promise<ChartsDTO[]> {
    const accessToken = await this.spotifyService.getAccessToken();
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const charts = transformCharts(response.data.tracks.items);
    return charts;
  }

  public async getKorea50Weekly(): Promise<ChartsDTO[]> {
    const accessToken = await this.spotifyService.getAccessToken();
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbJZGli0rRP3r";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const charts = transformCharts(response.data.tracks.items);
    return charts;
  }
}
