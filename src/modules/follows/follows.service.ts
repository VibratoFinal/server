import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follows } from "./entity/follows.entity";
import { Repository } from "typeorm";
import { CreateFollowDTO } from "./dto/create-follows.dto";
import { Users } from "@modules/auth/entity/auth.entity";

// 팔로우 추가/삭제

// type_id는 spotify API 연동하면서 비교를 해야할 듯
// 지금은 어떤 type_id든 다 들어감.

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async addFollow(uid: string, createFollowDTO: CreateFollowDTO) {
    try {
      const { type_id } = createFollowDTO;
      const user = await this.usersRepository.findOne({ where: { uid } });
      if (!user) {
        throw new Error("User not found");
      }

      return await this.followRepository.insert({
        user_uid: user,
        type_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFollow(uid: string, createFollowDTO: CreateFollowDTO) {
    try {
      const { type_id } = createFollowDTO;
      const user = await this.usersRepository.findOne({ where: { uid } });
      if (!user) {
        throw new Error("User not found");
      }

      return await this.followRepository.delete({
        user_uid: user,
        type_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
