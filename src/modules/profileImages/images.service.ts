import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/images.entity";
import { Repository } from "typeorm";
import { CreateImageDTO } from "./dto/create-images.dto";

@Injectable()
export class ProfileImagesService {
  constructor(
    @InjectRepository(ProfileImages)
    private profileImagesRepository: Repository<ProfileImages>,
  ) {}
  async getAllImages(): Promise<ProfileImages[]> {
    return this.profileImagesRepository.find();
  }

  async addProfileImage(createImageDTO: CreateImageDTO) {
    try {
      await this.profileImagesRepository
        .createQueryBuilder("images")
        .insert()
        .values({
          profile_image_URL: createImageDTO.profile_image_URL,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }
}
