import { Body, Controller, Delete, Headers, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import {
  CreateLikesCommentDTO,
  CreateLikesReviewDTO,
} from "./dto/create-likes-dto";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("/review")
  async addLikeReview(
    @Headers("Authorization") authHeader: string,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    try {
      const uid = authHeader.split("Bearer ")[1];
      const like = await this.likesService.addLikeReview(
        uid,
        createLikesReviewDTO,
      );
      return like;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post("/review/comment")
  async addLikeComment(
    @Headers("Authorization") authHeader: string,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    try {
      const uid = authHeader.split("Bearer ")[1];
      const like = await this.likesService.addLikeComment(
        uid,
        createLikesCommentDTO,
      );
      return like;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete("/reviews")
  async removeLikeReview(
    @Headers("Authorization") authHeader: string,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    try {
      const uid = authHeader.split("Bearer ")[1];
      const like = await this.likesService.removeLikeReview(
        uid,
        createLikesReviewDTO,
      );
      return like;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete("/reviews/comment")
  async removeLikeComment(
    @Headers("Authorization") authHeader: string,
    @Body() createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    try {
      const uid = authHeader.split("Bearer ")[1];
      const like = await this.likesService.removeLikeComment(
        uid,
        createLikesCommentDTO,
      );
      return like;
    } catch (error) {
      throw new Error(error);
    }
  }
}
