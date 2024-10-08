import { Injectable } from "@nestjs/common";
import { ReviewsService } from "../reviews/reviews.service";
import {
  AlbumDTO,
  ArtistDTO,
  forOthersDTO,
  TrackDTO,
} from "./dto/create-search.dto";
import { LikesService } from "../likes/likes.service";

@Injectable()
export class SearchsRepository {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly likesService: LikesService,
  ) {}

  public async transformArtist(
    uid: string,
    res: any,
    artist_id: string,
  ): Promise<ArtistDTO> {
    const [avg, count] = await this.reviewsService.getRateReview(artist_id);
    const liked = uid
      ? await this.likesService.checkLikeTypeid(uid, {
          type_id: artist_id,
        })
      : false;
    return {
      name: res.name,
      image_url: res.images[0].url,
      genres: res.genres,
      spotify_url: res.external_urls.spotify,
      avg_rated: avg,
      count_rated: count,
      liked,
    };
  }

  public async transformAlbum(
    uid: string,
    res: any,
    album_id: string,
  ): Promise<AlbumDTO> {
    const [avg, count] = await this.reviewsService.getRateReview(album_id);
    const liked = uid
      ? await this.likesService.checkLikeTypeid(uid, {
          type_id: album_id,
        })
      : false;
    return {
      name: res.name,
      image_url: res.images[0].url,
      artist_names: res.artists.map(artist => artist.name),
      genres: res.genres,
      release_date: res.release_date,
      total_tracks: res.total_tracks,
      spotify_url: res.external_urls.spotify,
      avg_rated: avg,
      count_rated: count,
      liked,
      tracks: await this.transformTrackForOthers(uid, res.tracks.items),
      artists: await this.transformArtistForOthers(uid, res.artists),
    };
  }

  public async transformTrack(
    uid: string,
    res: any,
    track_id: string,
  ): Promise<TrackDTO> {
    const [avg, count] = await this.reviewsService.getRateReview(track_id);
    const liked = uid
      ? await this.likesService.checkLikeTypeid(uid, {
          type_id: track_id,
        })
      : false;
    return {
      name: res.name,
      image_url: res.album.images[0].url,
      artist_names: res.artists.map(artist => artist.name),
      release_date: res.album.release_date,
      preview_url: res.preview_url,
      spotify_url: res.external_urls.spotify,
      track_number: res.track_number,
      duration: res.duration_ms,
      avg_rated: avg,
      count_rated: count,
      liked,
      album: await this.transformAlbumForOthers(uid, res.album),
      artists: await this.transformArtistForOthers(uid, res.artists),
    };
  }

  private async transformArtistForOthers(
    uid: string,
    items: any[],
  ): Promise<forOthersDTO[]> {
    return Promise.all(
      items.map(async item => {
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.id,
            })
          : false;
        return {
          id: item.id,
          name: item.name,
          spotify_url: item.external_urls.spotify,
          avg_rate: await this.reviewsService.getRateReview(item.id)[0],
          liked,
        };
      }),
    );
  }

  private async transformTrackForOthers(
    uid: string,
    items: any[],
  ): Promise<forOthersDTO[]> {
    return Promise.all(
      items.map(async item => {
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.id,
            })
          : false;
        return {
          id: item.id,
          name: item.name,
          spotify_url: item.external_urls.spotify,
          track_number: item.track_number,
          avg_rate: await this.reviewsService.getRateReview(item.id)[0],
          liked,
        };
      }),
    );
  }

  private async transformAlbumForOthers(
    uid: string,
    res: any,
  ): Promise<forOthersDTO> {
    const avg = await this.reviewsService.getRateReview(res.id);
    const liked = uid
      ? await this.likesService.checkLikeTypeid(uid, {
          type_id: res.id,
        })
      : false;
    return {
      id: res.id,
      name: res.name,
      spotify_url: res.external_urls.spotify,
      avg_rate: avg[0],
      liked,
    };
  }
}
