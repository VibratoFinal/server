import {
  Controller,
  Delete,
  Post,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { FollowsService } from "./follows.service";
import { CreateFollowDTO } from "./dto/create-follows.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";

@Controller("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async follow(
    @Request() req,
    @Body()
    createFollowDTO: CreateFollowDTO,
  ) {
    const { uid } = req.user;
    return await this.followsService.addFollow(uid, createFollowDTO);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  async unFollow(
    @Request() req,
    @Body()
    createFollowDTO: CreateFollowDTO,
  ) {
    const { uid } = req.user;
    return await this.followsService.deleteFollow(uid, createFollowDTO);
  }
}
