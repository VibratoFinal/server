import { Injectable } from "@nestjs/common";
import {
  AlbumDTO,
  ArtistDTO,
  ArtistOtherDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { ReviewsService } from "../reviews/reviews.service";

@Injectable()
export class MusicsRepository {
  constructor(private readonly reviewsService: ReviewsService) {}

  public async transformTracks(items: any[]): Promise<TrackDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(item.id);
        return {
          id: item.id,
          name: item.name,
          artists_name: item.artists.map(artist => artist.name),
          spotify_url: item.external_urls.spotify,
          preview: item.preview_url,
          album_id: item.album.id,
          album_name: item.album.name,
          image_url: item.album.images[0].url,
          album_spotify_url: item.album.external_urls.spotify,
          release_date: item.album.release_date,
          duration: item.duration,
          album_artists: await this.transformArtistsInOthers(item.artists),
          avg_rated: avg,
          count_rated: count,
          liked: false,
        };
      }),
    );
  }

  public async transformArtists(items: any[]): Promise<ArtistDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(item.id);
        return {
          id: item.id,
          name: item.name,
          spotify_url: item.external_urls.spotify,
          image_url: item.images[0].url,
          genres: item.genres,
          avg_rated: avg,
          count_rated: count,
          liked: false,
        };
      }),
    );
  }

  public async transformAlbums(items: any[]): Promise<AlbumDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(item.id);
        return {
          id: item.id,
          name: item.name,
          artists_name: item.artists.map(artist => artist.name),
          spotify_url: item.external_urls.spotify,
          image_url: item.images[0].url,
          total_tracks: item.total_tracks,
          release_date: item.release_date,
          album_artists: await this.transformArtistsInOthers(item.artists),
          avg_rated: avg,
          count_rated: count,
          liked: false,
        };
      }),
    );
  }

  public async transformAll(response: any): Promise<SearchAllDTO> {
    const tracks = await this.transformTracks(response.tracks.items);
    const artists = await this.transformArtists(response.artists.items);
    const albums = await this.transformAlbums(response.albums.items);

    return {
      tracks,
      artists,
      albums,
    };
  }

  public async transformArtistsInOthers(
    items: any[],
  ): Promise<ArtistOtherDTO[]> {
    return Promise.all(
      items.map(async item => ({
        id: item.id,
        name: item.name,
        spotify_url: item.external_urls.spotify,
        avg_rated: await this.reviewsService.getRateReview(item.id)[0],
        liked: false,
      })),
    );
  }
}
