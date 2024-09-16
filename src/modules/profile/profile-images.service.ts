import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/profile-images.entity";
import { Repository } from "typeorm";
import { CreateImageDTO } from "./dto/create-images.dto";
import { Users } from "../auth/entity/auth.entity";

@Injectable()
export class ProfileImagesService {
  constructor(
    @InjectRepository(ProfileImages)
    private profileImagesRepository: Repository<ProfileImages>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async getAllImages(): Promise<ProfileImages[]> {
    return this.profileImagesRepository.find();
  }

  async addProfileImage(createImageDTO: CreateImageDTO) {
    try {
      await this.profileImagesRepository.insert({
        profile_image_URL: createImageDTO.profile_image_URL,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
