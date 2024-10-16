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
import { InsertResult } from "typeorm";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // 리뷰 좋아요 작성
  @Post("/review")
  @HttpCode(201)
  @UseGuards(FirebaseAuthGuard)
  async addLikeReview(
    @Request() req,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ): Promise<InsertResult> {
    const { uid } = req.user;
    return await this.likesService.addLikeReview(uid, createLikesReviewDTO);
  }

  // 리뷰 좋아요 삭제
  @Delete("/review")
  @UseGuards(FirebaseAuthGuard)
  async deleteLikeReview(
    @Request() req,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.deleteLikeReview(uid, createLikesReviewDTO);
  }
  // 리뷰 좋아요 조회
  @Get("/review/:review_id")
  @HttpCode(202)
  @SkipAuthOptional()
  async getLikeReview(@Request() req, @Param("review_id") review_id: string) {
    if (req.user === undefined) {
      return false;
    }
    const { uid } = req.user;
    console.log("리뷰 좋아요 조회", uid);
    return await this.likesService.checkLikeReviewId(uid, {
      review_id: Number(review_id),
    });
  }

  // 댓글 좋아요 작성
  @Post("/review/comment")
  @UseGuards(FirebaseAuthGuard)
  async addLikeComment(
    @Request() req,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    const { uid } = req.user;
    return await this.likesService.addLikeComment(uid, createLikesCommentDTO);
  }

  // 댓글 좋아요 삭제
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

  // 댓글 좋아요 조회
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
    console.log("댓글 좋아요 조회 controller", uid);
    console.log("댓글 좋아요 조회 Param 입력값", {
      review_id: reviewId,
      comment_id: commentId,
    });

    return await this.likesService.checkLikeCommentId(uid, {
      review_id: reviewId,
      comment_id: commentId,
    });
  }

  // 타입 좋아요 작성
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
