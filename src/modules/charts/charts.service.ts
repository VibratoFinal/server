import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { transformCharts } from "./utils/transform";
import { ChartsDTO } from "./dto/create-charts.dto";
import { SpotifyService } from "../musics/spotify.service";
import { LimitDTO } from "./dto/chart-limit.dto";

@Injectable()
export class ChartsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly spotifyService: SpotifyService,
  ) {}

  public async getGlobal50(): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Global 50 : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get global 50",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKorea50(): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbNxXF4SkHj9F/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Korea 50 : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get korea 50",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getGlobal50Weekly(): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Global 50 Week : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get global 50 week",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKorea50Weekly(): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbJZGli0rRP3r/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Korea 50 Week : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Korea 50 week",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKoreaRecent(body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : body.limit;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DXe5W6diBL5N4/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: limit,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Korea Recent : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Korea Recent",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAnimaRnB(body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DWZuIX5Q3yUjF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: body.limit,
        },
      });

      const charts = transformCharts(response.data.items);
      return charts;
    } catch (err) {
      console.error("Failed to Get Anima R&B : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Anima R&B",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
