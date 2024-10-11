import {
  Controller,
  Delete,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
} from "@nestjs/common";
import { FollowsService } from "./follows.service";
import { CreateFollowDTO } from "./dto/create-follows.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";

@Controller("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @HttpCode(201)
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
  @HttpCode(200)
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
