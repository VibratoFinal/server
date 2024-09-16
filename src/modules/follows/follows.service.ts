import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follows } from "./entity/follows.entity";
import { Repository } from "typeorm";
import { CreateFollowDTO } from "./dto/create-follows.dto";
import { Users } from "src/modules/auth/entity/auth.entity";

// 팔로우 추가/삭제

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async addFollow(uid: string, typeId: CreateFollowDTO) {
    try {
      const user = await this.usersRepository.findOne({ where: { uid } });
      if (!user) {
        throw new Error("User not found");
      }

      await this.followRepository
        .createQueryBuilder("follows")
        .insert()
        .values({
          user_uid: user,
          type_id: typeId.type_id,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFollow(uid: string, typeId: CreateFollowDTO) {
    try {
      const user = await this.usersRepository.findOne({ where: { uid } });
      if (!user) {
        throw new Error("User not found");
      }

      await this.followRepository
        .createQueryBuilder()
        .delete()
        .from("follows")
        .where("follows.user_uid= :user_uid AND follows.type_id = :type_id", {
          user_uid: uid,
          type_id: typeId,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }
}
