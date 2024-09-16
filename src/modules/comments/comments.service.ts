import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Repository } from "typeorm";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { Reviews } from "src/modules/reviews/entity/reviews.entity";

// 코멘트 작성 add
// 수정 edit
// 조회 get
// 삭제 delete

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,

    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  async addComment(uid: string, comment: CreateCommentDTO) {
    try {
      const reviewId = await this.reviewRepository.findOne({
        where: { review_id: comment.review_id },
      });

      await this.commentRepository.insert({
        user_uid: uid,
        contents: comment.contents,
        review: reviewId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getComments(reviewId: number): Promise<Comments[]> {
    try {
      return await this.commentRepository
        .createQueryBuilder()
        .where("comments.review_id = :reviewId", { reviewId })
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async editComments(
    commentId: number,
    comment: CreateCommentDTO,
    uid: string,
  ) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { review_id: comment.review_id },
      });

      if (!review) {
        throw new Error("Review not found");
      }

      await this.commentRepository
        .createQueryBuilder()
        .update()
        .set({ contents: comment.contents })
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
