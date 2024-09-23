import { transformArtistsInOthers } from "src/modules/musics/utils/transform";
import { ChartsDTO } from "../dto/create-charts.dto";

export function transformCharts(items: any[]): ChartsDTO[] {
  return items.map(item => ({
    id: item.track.id,
    name: item.track.name,
    artists_name: item.track.artists.map(artist => artist.name),
    spotify_url: item.track.url,
    preview: item.track.preview_url,
    album_id: item.track.album.id,
    album_name: item.track.album.name,
    image_url: item.track.album.images[0].url,
    album_spotify_url: item.track.album.external_urls.spotify,
    release_date: item.track.album.release_date,
    album_artists: transformArtistsInOthers(item.track.artists),
    avg_rated: 0,
    count_rated: 0,
    liked: false,
  }));
}
