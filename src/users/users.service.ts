import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/users.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ProfileImages } from "src/profileImages/entity/images.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(ProfileImages)
    private profileimagesRepository: Repository<ProfileImages>,
  ) {}

  async getUser(uid: string): Promise<Users | null> {
    try {
      const user = await this.userRepository.findOne({ where: { uid } });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async joinUser(uid: string, user: CreateUserDTO) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUser(uid: string, user: CreateUserDTO) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }
}
