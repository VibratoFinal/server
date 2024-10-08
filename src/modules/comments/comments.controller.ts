import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

@Controller("review")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(":review_id/comments")
  @UseGuards(FirebaseAuthGuard)
  async addComment(
    @Request() req,
    @Param("review_id") reviewId: number,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    const { uid } = req.user;
    return this.commentsService.addComment(uid, reviewId, createCommentDTO);
  }

  // 해당 리뷰 전체 댓글 조회

  @Get(":reviewId/comments")
  @SkipAuth()
  async getAllComments(@Param("reviewId") reviewId: number) {
    return await this.commentsService.getAllComments(reviewId);
  }

  // 내가 쓴 댓글 조회
  @Get("comments")
  @UseGuards(FirebaseAuthGuard)
  async getUserComments(@Request() req) {
    const { uid } = req.user;
    return await this.commentsService.getUserComments(uid);
  }

  @Put(":reviewId/comments/:commentId")
  @UseGuards(FirebaseAuthGuard)
  async editComments(
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
    @Request() req,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    const { uid } = req.user;
    await this.commentsService.editComments(
      commentId,
      reviewId,
      createCommentDTO,
      uid,
    );
    return { message: "Comment 수정 완료" };
  }

  @Delete(":reviewId/comments/:commentId")
  @UseGuards(FirebaseAuthGuard)
  async deleteComment(
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
    @Request() req,
  ) {
    const { uid } = req.user;

    await this.commentsService.deleteComment(reviewId, commentId, uid);
  }
}
