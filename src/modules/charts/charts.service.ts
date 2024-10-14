import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { ChartsDTO } from "./dto/create-charts.dto";
import { SpotifyService } from "../musics/spotify.service";
import { LimitDTO } from "./dto/chart-limit.dto";
import { ChartsRepository } from "./charts.repository";

@Injectable()
export class ChartsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly spotifyService: SpotifyService,
    private readonly chartsRepository: ChartsRepository,
  ) {}

  public async getGlobal50(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getKorea50(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbNxXF4SkHj9F/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getGlobal50Weekly(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getKorea50Weekly(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbJZGli0rRP3r/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getKoreaRecent(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DXe5W6diBL5N4/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getAnimaRnB(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DWZuIX5Q3yUjF/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
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

  public async getJazzforSleep(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DXa1rZf8gLhyz/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Jazz for Sleep : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Jazz for Sleep",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKpopDance(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DX3sCx6B9EAOr/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get K-Pop Dance : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get K-Pop Dance",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAllTimeHighestRated(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/2XVc9E8tEkpBz7z8wZbMul/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get All Time Highest Rated Songs : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get All Time Highest Rated Songs",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getTodaysHit(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.limit, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get All Today's Top Hits : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get All Time Today's Top Hits",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
