import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, UpdateResult } from "typeorm";
import { Users } from "./entity/auth.entity";
import { UserResponseDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getUser(uid: string): Promise<UserResponseDTO | null> {
    console.log(uid);

    const user = await this.userRepository.findOne({
      where: { uid },
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return {
      profileImage: user.profileImage,
      nickname: user.nickname,
    };
  }

  async joinUser(uid: string, user: UserResponseDTO): Promise<InsertResult> {
    return await this.userRepository.insert({
      uid: uid,
      nickname: user.nickname,
      profileImage: user.profileImage,
    });
  }

  async editUser(uid: string, user: UserResponseDTO): Promise<UpdateResult> {
    if (!user.profileImage) {
      throw new HttpException("Profile image not found", HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.update(
      { uid: uid },
      { profileImage: user.profileImage, nickname: user.nickname },
    );
  }
}
