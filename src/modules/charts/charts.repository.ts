import { Injectable } from "@nestjs/common";
import { ChartsDTO } from "./dto/create-charts.dto";
import { ReviewsService } from "../reviews/reviews.service";
import { MusicsRepository } from "../musics/musics.repository";
import { LikesService } from "../likes/likes.service";

@Injectable()
export class ChartsRepository {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly musicsRepository: MusicsRepository,
    private readonly likesService: LikesService,
  ) {}

  public async transformCharts(
    uid: string,
    items: any[],
  ): Promise<ChartsDTO[]> {
    return Promise.all(
      items.map(async item => {
        const [avg, count] = await this.reviewsService.getRateReview(
          item.track.id,
        );
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: item.track.id,
            })
          : false;
        return {
          id: item.track.id,
          name: item.track.name,
          artists_name: item.track.artists.map(artist => artist.name),
          spotify_url: item.track.url,
          preview: item.track.preview_url || "",
          album_id: item.track.album.id,
          album_name: item.track.album.name,
          image_url: item.track.album.images[0].url,
          album_spotify_url: item.track.album.external_urls.spotify,
          release_date: item.track.album.release_date,
          album_artists: await this.musicsRepository.transformArtistsInOthers(
            uid,
            item.track.artists,
          ),
          avg_rated: avg,
          count_rated: count,
          liked,
        };
      }),
    );
  }
}
