import { Injectable } from "@nestjs/common";
import {
  AlbumDTO,
  ArtistDTO,
  ArtistOtherDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { ReviewsService } from "../reviews/reviews.service";
import { LikesService } from "../likes/likes.service";
import { convertMsToString } from "@/common/utils/helpers";

@Injectable()
export class MusicsRepository {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly likesService: LikesService,
  ) {}

  public async transformTracks(uid: string, items: any[]): Promise<TrackDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg_rated, count_rated] =
          await this.reviewsService.getRateReview(item.id);
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.id,
            })
          : false;
        const duration = convertMsToString(item.duration_ms);

        return {
          id: item.id,
          name: item.name,
          artists_name: item.artists.map(artist => artist.name),
          spotify_url: item.external_urls.spotify || "",
          preview: item.preview_url || "",
          album_id: item.album.id,
          album_name: item.album.name,
          image_url: item.album.images[0]?.url || "",
          album_spotify_url: item.album.external_urls.spotify || "",
          release_date: item.album.release_date,
          duration,
          album_artists: await this.transformArtistsInOthers(uid, item.artists),
          avg_rated,
          count_rated,
          liked,
        };
      }),
    );
  }

  public async transformArtists(
    uid: string,
    items: any[],
  ): Promise<ArtistDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(item.id);
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.id,
            })
          : false;
        return {
          id: item.id,
          name: item.name,
          spotify_url: item.external_urls.spotify || "",
          image_url: item.images[0]?.url || "",
          genres: item.genres || [],
          avg_rated: avg,
          count_rated: count,
          liked,
        };
      }),
    );
  }

  public async transformAlbums(uid: string, items: any[]): Promise<AlbumDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(item.id);
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.id,
            })
          : false;
        return {
          id: item.id,
          name: item.name,
          artists_name: item.artists.map(artist => artist.name),
          spotify_url: item.external_urls.spotify || "",
          image_url: item.images[0]?.url || "",
          total_tracks: item.total_tracks,
          release_date: item.release_date,
          album_artists: await this.transformArtistsInOthers(uid, item.artists),
          avg_rated: avg,
          count_rated: count,
          liked,
        };
      }),
    );
  }

  public async transformAll(uid: string, response: any): Promise<SearchAllDTO> {
    const tracks = await this.transformTracks(uid, response.tracks.items);
    const artists = await this.transformArtists(uid, response.artists.items);
    const albums = await this.transformAlbums(uid, response.albums.items);

    return {
      tracks,
      artists,
      albums,
    };
  }

  public async transformArtistsInOthers(
    uid: string,
    items: any[],
  ): Promise<ArtistOtherDTO[]> {
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
          spotify_url: item.external_urls.spotify || "",
          avg_rated: await this.reviewsService.getRateReview(item.id)[0],
          liked,
        };
      }),
    );
  }
}
