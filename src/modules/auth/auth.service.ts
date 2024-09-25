import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, UpdateResult } from "typeorm";
import { Users } from "./entity/auth.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ProfileImages } from "@modules/profile/entity/profile-images.entity";

export class UserResponseDTO {
  profileImageId: number;
  nickname: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(ProfileImages)
    private profileimagesRepository: Repository<ProfileImages>,
  ) {}

  async getUser(uid: string): Promise<UserResponseDTO | null> {
    console.log(uid);

    const user = await this.userRepository.findOne({
      where: { uid },
      relations: ["profileImage"],
    });
    if (!user) {
      return null;
    }
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    return {
      profileImageId,
      nickname: user.nickname,
    };
  }

  async joinUser(uid: string, user: CreateUserDTO): Promise<InsertResult> {
    const profileImage = await this.profileimagesRepository.findOne({
      where: { id: user.profileImageId },
    });
    if (!profileImage) {
      throw new Error("Profile image not found");
    }
    return await this.userRepository.insert({
      uid: uid,
      profileImage: profileImage,
      nickname: user.nickname,
    });
  }

  async editUser(uid: string, user: CreateUserDTO): Promise<UpdateResult> {
    const profileImage = await this.profileimagesRepository.findOne({
      where: { id: user.profileImageId },
    });

    if (!profileImage) {
      throw new Error("Profile image not found");
    }

    return await this.userRepository.update(
      { uid: uid },
      { profileImage: profileImage, nickname: user.nickname },
    );
  }
}
