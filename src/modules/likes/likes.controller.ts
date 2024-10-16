import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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
  @HttpCode(201)
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

  @Delete("/review")
  @UseGuards(FirebaseAuthGuard)
  async deleteLikeReview(
    @Request() req,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.deleteLikeReview(uid, createLikesReviewDTO);
  }

  @Delete("/review/comment")
  @UseGuards(FirebaseAuthGuard)
  async deleteLikeComment(
    @Request() req,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.deleteLikeComment(
      uid,
      createLikesCommentDTO,
    );
  }

  @Get("/review/:reviewId")
  @HttpCode(202)
  @SkipAuthOptional()
  async getLikeReview(@Request() req, @Param("reviewId") reviewId: string) {
    if (req.user === undefined) {
      return false;
    }
    const { uid } = req.user;
    const parsedReviewId = parseInt(reviewId, 10);
    return await this.likesService.checkLikeReviewId(uid, parsedReviewId);
  }

  @Get("/review/:reviewId/comment/:commentId")
  @HttpCode(202)
  @SkipAuthOptional()
  async getLikeComment(
    @Request() req,
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
  ) {
    if (req.user === undefined) {
      return false;
    }
    const { uid } = req.user;

    return await this.likesService.checkLikeCommentId(uid, reviewId, commentId);
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
  async deleteLikeType(
    @Request() req,
    @Body() createLikesTypeDTO: CreateLikesTypeDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.deleteLikeType(uid, createLikesTypeDTO);
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
