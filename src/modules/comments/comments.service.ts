import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Repository } from "typeorm";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { Reviews } from "@modules/reviews/entity/reviews.entity";

// 코멘트 작성 add
// 수정 edit
// 전체조회 getAll
// 내가 쓴 댓글 조회 get // UID 필요
// 삭제 delete

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,

    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  // 댓글 작성
  async addComment(
    uid: string,
    reviewId: number,
    createCommentDTO: CreateCommentDTO,
  ) {
    const { contents } = createCommentDTO;

    const review = await this.reviewRepository.findOne({
      where: { review_id: reviewId },
    });

    if (!review) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    return await this.commentRepository.insert({
      user_uid: uid,
      contents,
      review,
    });
  }

  // 해당 리뷰 댓글 전체 조회
  async getAllComments(reviewId: number): Promise<Comments[]> {
    const allComments = await this.commentRepository.find({
      where: { review: { review_id: reviewId } },
    });

    if (!allComments.length) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }

    return allComments;
  }

  // 내가 쓴 댓글 조회
  async getUserComments(uid: string): Promise<Comments[]> {
    return await this.commentRepository.find({ where: { user_uid: uid } });
  }

  // 댓글 수정
  async editComments(
    reviewId: number,
    commentId: number,
    createCommentDTO: CreateCommentDTO,
    uid: string,
  ): Promise<void> {
    const { contents } = createCommentDTO;
    await this.findComment(reviewId, commentId, uid);

    await this.commentRepository.update(
      { comment_id: commentId, user_uid: uid },
      { contents },
    );
  }

  // 댓글 삭제
  async deleteComment(
    reviewId: number,
    commentId: number,
    uid: string,
  ): Promise<void> {
    await this.findComment(reviewId, commentId, uid);

    await this.commentRepository.delete({
      comment_id: commentId,
      user_uid: uid,
    });
  }

  private async findComment(reviewId: number, commentId: number, uid: string) {
    const findComment = await this.commentRepository.findOne({
      where: {
        review: { review_id: reviewId },
        comment_id: commentId,
      },
    });
    if (!findComment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }

    if (findComment.user_uid !== uid) {
      throw new HttpException(
        "Forbidden: You do not have permission to delete this comment",
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
