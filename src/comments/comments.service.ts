import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Repository } from "typeorm";
import { CreateCommentDTO } from "./dto/create-comments.dto";

// 코멘트 작성 add
// 수정 edit
// 조회 get
// 삭제 delete

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  async addComment(uid: string, comment: CreateCommentDTO) {
    try {
      await this.commentRepository
        .createQueryBuilder("comments")
        .insert()
        .values({
          user_uid: uid,
          contents: comment.contents,
          review_id: comment.review_id,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getComments(reviewId: number) {
    try {
      const getComments = await this.commentRepository
        .createQueryBuilder("comments")
        .select("comments")
        .where("comments.review_id = :review_id", {
          review_id: reviewId,
        })
        .getMany();
      return getComments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editComments(
    commentId: Comments,
    comment: CreateCommentDTO,
    uid: string,
  ) {
    try {
      await this.commentRepository
        .createQueryBuilder()
        .update()
        .set({ review_id: comment.review_id, contents: comment.contents })
        .where(
          "comments.comment_id = :comment_id AND comments.user_uid = :uid",
          {
            comment_id: commentId,
            uid: uid,
          },
        )
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteComment(commentId: Comments, uid: string) {
    try {
      const deleteComment = await this.commentRepository
        .createQueryBuilder()
        .delete()
        .from("comments")
        .where(
          "comments.comment_id = :comment_id AND comments.user_uid = :uid",
          {
            comment_id: commentId,
            uid: uid,
          },
        )
        .execute();

      return deleteComment;
    } catch (error) {
      throw new Error(error);
    }
  }
}
