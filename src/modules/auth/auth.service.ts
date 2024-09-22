import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/auth.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ProfileImages } from "../profile/entity/profile-images.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(ProfileImages)
    private profileimagesRepository: Repository<ProfileImages>,
  ) {}

  async getUser(uid: string): Promise<Users | null> {
    return await this.userRepository.findOne({ where: { uid } });
  }

  async joinUser(uid: string, user: CreateUserDTO) {
    const profileImage = await this.profileimagesRepository.findOne({
      where: { id: user.profileImageId },
    });

    if (!profileImage) {
      throw new Error("Profile image not found");
    }

    await this.userRepository.insert({
      uid: uid,
      profileImage: profileImage,
      nickname: user.nickname,
    });
  }

  async editUser(uid: string, user: CreateUserDTO) {
    const profileImage = await this.profileimagesRepository.findOne({
      where: { id: user.profileImageId },
    });

    if (!profileImage) {
      throw new Error("Profile image not found");
    }

    await this.userRepository.update(
      { uid: uid },
      { profileImage: profileImage, nickname: user.nickname },
    );
  }
}
