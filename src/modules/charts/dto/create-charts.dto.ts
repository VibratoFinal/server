import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  IsUrl,
} from "class-validator";
import { ArtistOtherDTO } from "src/modules/musics/dto/create-result.dto";

export class ChartsDTO {
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

  @IsArray()
  album_artists: ArtistOtherDTO[];

  @IsNumber()
  avg_rated: number;

  @IsNumber()
  count_rated: number;

  @IsBoolean()
  liked: boolean;
}
