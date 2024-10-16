import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from "class-validator";

export class ArtistDTO {
  @IsString()
  name: string;

  @IsUrl()
  image_url: string;

  @IsArray()
  genres: string[];

  @IsUrl()
  spotify_url: string;

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;
}

export class AlbumDTO {
  @IsString()
  name: string;

  @IsUrl()
  image_url: string;

  @IsArray()
  artist_names: string[];

  @IsArray()
  genres: string[];

  @IsDate()
  release_date: Date;

  @IsNumber()
  total_tracks: number;

  @IsUrl()
  spotify_url: string;

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;

  @IsArray()
  tracks: forOthersDTO[];

  @IsArray()
  artists: forOthersDTO[];
}

export class TrackDTO {
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsUrl()
  image_url?: string;

  @IsArray()
  artist_names: string[];

  @IsDate()
  release_date?: Date;

  @IsUrl()
  preview_url: string;

  @IsUrl()
  spotify_url?: string;

  @IsNumber()
  track_number: number;

  @IsString()
  duration: string;

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;

  @IsNotEmpty()
  album?: forOthersDTO;

  @IsArray()
  artists?: forOthersDTO[];
}

export class forOthersDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  preview_url?: string;

  @IsUrl()
  spotify_url?: string;

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated?: number;

  @IsBoolean()
  liked: boolean;

  @IsNumber()
  track_number?: number;
}
