import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "../dto/create-result.dto";

export function transformTracks(items: any[]): TrackDTO[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
    preview: item.preview_url,
    album_id: item.album.id,
    album_name: item.album.name,
    album_image: item.album.images[0].url,
    album_spotify_url: item.album.external_urls.spotify,
    release_date: item.album.release_date,
    album_artists: transformArtistsInOthers(item.artists),
    rated: 0,
  }));
}

export function transformArtists(items: any[]): ArtistDTO[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
    image: item.images[0].url,
    genres: item.genres,
    rated: 0,
  }));
}

export function transformAlbums(items: any[]): AlbumDTO[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
    image: item.images[0].url,
    total_tracks: item.total_tracks,
    release_date: item.release_date,
    album_artists: transformArtistsInOthers(item.artists),
    rated: 0,
  }));
}

export function transformAll(response: any): SearchAllDTO {
  const tracks = transformTracks(response.tracks.items);
  const artists = transformArtists(response.artists.items);
  const albums = transformAlbums(response.albums.items);

  return {
    tracks,
    artists,
    albums,
  };
}

export function transformArtistsInOthers(items: any[]) {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    spotify_url: item.external_urls.spotify,
  }));
}
