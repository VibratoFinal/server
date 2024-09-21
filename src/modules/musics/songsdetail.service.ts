import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SongsDetailService {
  constructor(private readonly configSerivce: ConfigService) {}

  public async getTracksInfo(track_id: string) {
    const options = {
      method: "GET",
      url: "https://songstats.p.rapidapi.com/tracks",
      params: {
        spotify_track_id: track_id,
      },
      headers: {
        "x-rapidapi-key": this.configSerivce.get("RAPID_API_KEY"),
        "x-rapidapi-host": "songstats.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Tracks : ", response.data.result);
    } catch (err) {
      console.error(err);
    }
  }
}
