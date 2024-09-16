import { Body, Controller, Delete, Headers, Post } from "@nestjs/common";
import { FollowsService } from "./follows.service";
import { CreateFollowDTO } from "./dto/create-follows.dto";

@Controller("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  async follow(
    @Headers("Authorization") authHeader: string,
    @Body()
    createFollowDTO: CreateFollowDTO,
  ) {
    const uid = authHeader.split("Bearer ")[1];
    const follow = await this.followsService.addFollow(uid, createFollowDTO);
    return follow;
  }

  @Delete()
  async unFollow(
    @Headers("Authorization") authHeader: string,
    @Body()
    createFollowDTO: CreateFollowDTO,
  ) {
    const uid = authHeader.split("Bearer ")[1];
    const follow = await this.followsService.deleteFollow(uid, createFollowDTO);
    return follow;
  }
}
