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
import { Comments } from "./entity/comments.entity";

@Controller("comments")
export class CommentsController {
  constructor(
    // private readonly usersService: UsersService  // uid 사용할 때 사용할 것
    private readonly commentsService: CommentsService,
  ) {}
  @Post()
  async addComment(
    @Headers("Authorization") authHeader: string,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    try {
      return this.commentsService.addComment(authHeader, createCommentDTO);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(":reviewId")
  async getComments(@Param("reviewId") reviewId: number) {
    const getComments = await this.commentsService.getComments(reviewId);

    return getComments;
  }

  @Put(":commentId")
  async editComments(
    @Param("commentId") commentId: Comments,
    @Headers("Authorization") authHeader: string,
    @Body()
    createCommentDTO: CreateCommentDTO,
  ) {
    try {
      await this.commentsService.editComments(
        commentId,
        createCommentDTO,
        authHeader,
      );
      return { message: "Comment 수정 완료" };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(":commentId")
  async deleteComment(
    @Param("commentId") commentId: Comments,
    @Headers("Authorization") authHeader: string,
  ) {
    await this.commentsService.deleteComment(commentId, authHeader);
    return { message: "Comment 삭제 완료" };
  }
}
