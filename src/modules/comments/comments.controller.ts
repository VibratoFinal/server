import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./dto/create-comments.dto";

@Controller("review")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post(":review_id/comments")
  async addComment(
    @Headers("Authorization") authHeader: string,
    @Param("review_id") reviewId: number,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    try {
      return this.commentsService.addComment(
        authHeader,
        reviewId,
        createCommentDTO,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // 해당 리뷰 전체 댓글 조회
  @Get(":reviewId/comments")
  async getAllComments(@Param("reviewId") reviewId: number) {
    return await this.commentsService.getAllComments(reviewId);
  }

  // 내가 쓴 댓글 조회
  @Get("comments")
  async getUserComments(@Headers("Authorization") uid: string) {
    return await this.commentsService.getUserComments(uid);
  }

  @Put(":reviewId/comments/:commentId")
  async editComments(
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
    @Headers("Authorization") authHeader: string,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    try {
      await this.commentsService.editComments(
        commentId,
        reviewId,
        createCommentDTO,
        authHeader,
      );
      return { message: "Comment 수정 완료" };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(":reviewId/comments/:commentId")
  async deleteComment(
    @Param("commentId") commentId: number,
    @Headers("Authorization") authHeader: string,
  ) {
    await this.commentsService.deleteComment(commentId, authHeader);
    return { message: "Comment 삭제 완료" };
  }
}
