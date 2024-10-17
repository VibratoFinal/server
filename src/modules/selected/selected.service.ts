import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikesType } from "../likes/entity/likesType.entity";
import { Repository } from "typeorm";
import { Users } from "../auth/entity/auth.entity";
import { SpotifyService } from "../musics/spotify.service";
import axios from "axios";

import { SearchsRepository } from "../searchs/searchs.repository";
import {
  AlbumDTO,
  ArtistDTO,
  TrackDTO,
} from "../searchs/dto/create-search.dto";

@Injectable()
export class SelectedService {
  constructor(
    @InjectRepository(LikesType)
    private likesTypeRepository: Repository<LikesType>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private readonly spotifyService: SpotifyService,
    private readonly searchsRepository: SearchsRepository,
  ) {}

  private async getUser(uid: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { uid } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async getLikes(uid: string): Promise<string[] | null> {
    const user_uid = await this.getUser(uid);

    const allLikes: LikesType[] = await this.likesTypeRepository.find();
    const myLikes: string[] = [];
    for (const like of allLikes) {
      if (like.user_uid.uid === user_uid.uid) {
        myLikes.push(like.type_id);
      }
    }

    if (!myLikes || myLikes.length === 0) {
      return null;
    } else {
      return myLikes;
    }
  }

  public async likedTracks(uid: string): Promise<TrackDTO[] | HttpStatus> {
    try {
      const likes = await this.getLikes(uid);
      if (!likes) {
        return HttpStatus.NO_CONTENT;
      }

      const accessToken = await this.spotifyService.getAccessToken();
      const url = "https://api.spotify.com/v1/tracks/";
      const tracks: TrackDTO[] = [];
      for (const id of likes) {
        try {
          const response = await axios.get(url + `${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.data) {
            const newTrack: TrackDTO =
              await this.searchsRepository.transformTrack(
                uid,
                response.data,
                id,
              );
            tracks.push(newTrack);
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            continue;
          }
          console.error(err);
        }
      }
      return tracks;
    } catch (err) {
      console.error("Failed to Get Liked Tracks : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to Liked Tracks",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async likedAlbums(uid: string): Promise<AlbumDTO[] | HttpStatus> {
    try {
      const likes = await this.getLikes(uid);
      if (!likes) {
        return HttpStatus.NO_CONTENT;
      }

      const accessToken = await this.spotifyService.getAccessToken();
      const url = "https://api.spotify.com/v1/albums/";
      const albums: AlbumDTO[] = [];
      for (const id of likes) {
        try {
          const response = await axios.get(url + `${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.data) {
            const newAlbum: AlbumDTO =
              await this.searchsRepository.transformAlbum(
                uid,
                response.data,
                id,
              );
            albums.push(newAlbum);
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            continue;
          }
          console.error(err);
        }
      }
      return albums;
    } catch (err) {
      console.error("Failed to Get Liked Albums : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to Liked Albums",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async likedArtists(uid: string): Promise<ArtistDTO[] | HttpStatus> {
    try {
      const likes = await this.getLikes(uid);
      if (!likes) {
        return HttpStatus.NO_CONTENT;
      }

      const accessToken = await this.spotifyService.getAccessToken();
      const url = "https://api.spotify.com/v1/artists/";
      const artists: ArtistDTO[] = [];
      for (const id of likes) {
        try {
          const response = await axios.get(url + `${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.data) {
            const newArtist: ArtistDTO =
              await this.searchsRepository.transformArtist(
                uid,
                response.data,
                id,
              );
            artists.push(newArtist);
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            continue;
          }
          console.error(err);
        }
      }
      return artists;
    } catch (err) {
      console.error("Failed to Get Liked Artists : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to Liked Artists",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
