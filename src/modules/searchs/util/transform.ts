import {
  AlbumDTO,
  ArtistDTO,
  forOthersDTO,
  TrackDTO,
} from "../dto/create-search.dto";

export function transformArtist(res: any): ArtistDTO {
  return {
    name: res.name,
    image_url: res.images[0].url,
    genres: res.genres,
    spotify_url: res.external_urls.spotify,
    avg_rated: 0,
    count_rated: 0,
    liked: false,
  };
}

export function transformAlbum(res: any): AlbumDTO {
  return {
    name: res.name,
    image_url: res.images[0].url,
    artist_names: res.artists.map(artist => artist.name),
    genres: res.genres,
    release_date: res.release_date,
    total_tracks: res.total_tracks,
    spotify_url: res.external_urls.spotify,
    avg_rated: 0,
    count_rated: 0,
    liked: false,
    tracks: transformTrackForOthers(res.tracks.items),
    artists: transformArtistForOthers(res.artists),
  };
}

export function transformTrack(res: any): TrackDTO {
  return {
    name: res.name,
    image_url: res.album.images[0].url,
    artist_names: res.artists.map(artist => artist.name),
    release_date: res.album.release_date,
    preview_url: res.preview_url,
    spotify_url: res.external_urls.spotify,
    track_number: res.track_number,
    duration: res.duration_ms,
    avg_rated: 0,
    count_rated: 0,
    liked: false,
    album: transformAlbumForOthers(res.album),
    artists: transformArtistForOthers(res.artists),
  };
}

function transformArtistForOthers(items: any[]): forOthersDTO[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
    avg_rate: 0,
    liked: false,
  }));
}

function transformTrackForOthers(items: any[]): forOthersDTO[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
    track_number: item.track_number,
    avg_rate: 0,
    liked: false,
  }));
}

function transformAlbumForOthers(res: any): forOthersDTO {
  return {
    id: res.id,
    name: res.name,
    spotify_url: res.external_urls.spotify,
    avg_rate: 0,
    liked: false,
  };
}
