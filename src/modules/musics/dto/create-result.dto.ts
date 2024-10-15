import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  IsUrl,
} from "class-validator";

export class TrackDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  artists_name: string[];

  @IsUrl()
  spotify_url: string;

  @IsUrl()
  preview: string;

  @IsString()
  album_id: string;

  @IsString()
  album_name: string;

  @IsUrl()
  image_url: string;

  @IsUrl()
  album_spotify_url: string;

  @IsDate()
  release_date: Date;

  @IsString()
  duration: string;

  @IsArray()
  album_artists: ArtistOtherDTO[];

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;
}

export class ArtistDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  spotify_url: string;

  @IsUrl()
  image_url: string;

  @IsString()
  genres: string;

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;
}

export class AlbumDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  artists_name: string[];

  @IsUrl()
  image_url: string;

  @IsNumber()
  total_tracks: number;

  @IsDate()
  release_date: Date;

  @IsArray()
  album_artists: ArtistOtherDTO[];

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;
}

export class SearchAllDTO {
  @IsArray()
  tracks: TrackDTO[];

  @IsArray()
  artists: ArtistDTO[];

  @IsArray()
  albums: AlbumDTO[];
}

export class ArtistOtherDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  spotify_url: string;

  @IsNumber()
  avg_rated: number;

  @IsBoolean()
  liked: boolean;
}
