import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follows } from "./entity/follows.entity";
import { Repository } from "typeorm";
import { CreateFollowDTO, FindFollowDTO } from "./dto/create-follows.dto";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Follows[]> {
    return this.followRepository.find();
  }

  async find(findFollowDTO: FindFollowDTO) {
    const { user_uid } = findFollowDTO;
    const user = await this.userRepository.findOne({
      where: { uid: parseInt(user_uid, 10) },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.followRepository.findOne({ where: { user_uid: user } });
  }
  async create(createFollowDTO: CreateFollowDTO) {
    const { user_uid, album_id } = createFollowDTO;

    const user = await this.userRepository.findOne({
      where: { uid: parseInt(user_uid, 10) },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const follow = new Follows();
    follow.album_id = album_id;
    follow.user_uid = user;

    return this.followRepository.save(follow);
  }
}
