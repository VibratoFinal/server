import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/users.entity";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getUser(idToken: string): Promise<Users | null> {
    try {
      const user = await this.userRepository
        .createQueryBuilder("users")
        .select(["users.uid"])
        .where("users.uid= :uid", { idToken })
        .getOne();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async joinUser(uid: string, user: CreateUserDTO) {
    try {
      await this.userRepository
        .createQueryBuilder("users")
        .insert()
        .values({
          uid: uid,
          profile_image_id: user.image_id,
          nickname: user.nickname,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }
}
