import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Images } from "./entity/images.entity";
import { Repository } from "typeorm";
import { CreateImageDTO } from "./dto/create-images.dto";

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}
  async getProfileImage() {
    try {
      const getImage = await this.imageRepository
        .createQueryBuilder("images")
        .select("images")
        .getMany();

      return getImage;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProfileImage(createImageDTO: CreateImageDTO) {
    try {
      await this.imageRepository
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
