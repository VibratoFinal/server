import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CommentsService, CreateResponseCommentDTO } from "./comments.service";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";

@Controller("review")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // 댓글 작성
  @Post(":review_id/comments")
  @HttpCode(201)
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
  @Get(":review_id/comments")
  @HttpCode(200)
  @SkipAuthOptional()
  async getAllComments(
    @Request() req,
    @Param("review_id") review_id: number,
  ): Promise<CreateResponseCommentDTO[]> {
    const uid = req.user ? req.user.uid : null;

    return await this.commentsService.getAllComments(uid, review_id);
  }

  // 특정 댓글 조회
  @Get(":review_id/comments/:comment_id")
  @HttpCode(200)
  @SkipAuthOptional()
  async getComments(
    @Request() req,
    @Param("review_id") review_id: number,
    @Param("comment_id") comment_id: number,
  ): Promise<CreateResponseCommentDTO> {
    const uid = req.user ? req.user.uid : null;

    return await this.commentsService.getComments(uid, review_id, comment_id);
  }

  // 내가 쓴 댓글 조회
  @Get("comments")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async getUserComments(@Request() req): Promise<CreateResponseCommentDTO[]> {
    const { uid } = req.user;
    return await this.commentsService.getUserComments(uid);
  }

  // 댓글 수정
  @Put(":reviewId/comments/:commentId")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async editComments(
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
    @Request() req,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    const { uid } = req.user;
    return await this.commentsService.editComments(
      reviewId,
      commentId,
      uid,
      createCommentDTO,
    );
  }

  // 댓글 삭제
  @Delete(":reviewId/comments/:commentId")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async deleteComment(
    @Param("reviewId") reviewId: number,
    @Param("commentId") commentId: number,
    @Request() req,
  ) {
    const { uid } = req.user;

    return await this.commentsService.deleteComment(reviewId, commentId, uid);
  }
}
