import { IsArray, IsDate, IsNumber, IsString, IsUrl } from "class-validator";

export class TrackDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  spotify_url: string;

  @IsUrl()
  preview: string;

  @IsString()
  album_id: string;

  @IsString()
  album_name: string;

  @IsUrl()
  album_image: string;

  @IsUrl()
  album_spotify_url: string;

  @IsDate()
  release_date: Date;

  @IsArray()
  album_artists: ArtistDTO[];

  @IsNumber()
  rated: number;
}

export class ArtistDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  spotify_url: string;

  @IsUrl()
  image?: string;

  @IsString()
  genres?: string;

  @IsNumber()
  rated?: number;
}

export class AlbumDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  total_tracks: number;

  @IsDate()
  release_date: Date;

  @IsArray()
  album_artists: ArtistDTO[];

  @IsNumber()
  rated: number;
}

export class SearchAllDTO {
  @IsArray()
  tracks: TrackDTO[];

  @IsArray()
  artists: ArtistDTO[];

  @IsArray()
  albums: AlbumDTO[];
}
