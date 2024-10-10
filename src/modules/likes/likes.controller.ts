import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import {
  CreateLikesCommentDTO,
  CreateLikesReviewDTO,
  CreateLikesTypeDTO,
} from "./dto/create-likes-dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("/review")
  @UseGuards(FirebaseAuthGuard)
  async addLikeReview(
    @Request() req,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.addLikeReview(uid, createLikesReviewDTO);
  }

  @Post("/review/comment")
  @UseGuards(FirebaseAuthGuard)
  async addLikeComment(
    @Request() req,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.addLikeComment(uid, createLikesCommentDTO);
  }

  @Delete("/reviews")
  @UseGuards(FirebaseAuthGuard)
  async removeLikeReview(
    @Request() req,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.removeLikeReview(uid, createLikesReviewDTO);
  }

  @Delete("/reviews/comment")
  @UseGuards(FirebaseAuthGuard)
  async removeLikeComment(
    @Request() req,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.removeLikeComment(
      uid,
      createLikesCommentDTO,
    );
  }

  @Post("/type")
  @HttpCode(201)
  @UseGuards(FirebaseAuthGuard)
  async addLikeType(
    @Request() req,
    @Body() createLikesTypeDTO: CreateLikesTypeDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.addLikeType(uid, createLikesTypeDTO);
  }

  @Delete("/type")
  @HttpCode(204)
  @UseGuards(FirebaseAuthGuard)
  async removeLikeType(
    @Request() req,
    @Body() createLikesTypeDTO: CreateLikesTypeDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.removeLikeType(uid, createLikesTypeDTO);
  }

  @Get("/type")
  @HttpCode(202)
  @SkipAuthOptional()
  async getLikeType(
    @Request() req,
    @Body() createLikesTypeDTO: CreateLikesTypeDTO,
  ) {
    if (req.user === undefined) {
      return false;
    }
    const { uid } = req.user;
    return await this.likesService.checkLikeTypeid(uid, createLikesTypeDTO);
  }
}
