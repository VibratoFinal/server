import { Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { FollowsService } from "./follows.service";

@Controller("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get()
  findFollows(@Headers("Authorization") user_uid: string) {
    return this.followsService.find({
      user_uid,
    });
  }

  @Post(":album_id")
  createFollows(
    @Param("album_id") album_id: number,
    @Headers("Authorization") user_uid: string,
  ) {
    return this.followsService.create({
      album_id: album_id,
      user_uid: user_uid,
    });
  }
}
