import { IsArray, IsDate, IsNumber, IsString, IsUrl } from "class-validator";
import { ArtistDTO } from "src/modules/musics/dto/create-result.dto";

export class ChartsDTO {
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
