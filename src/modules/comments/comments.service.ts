import { Injectable } from "@nestjs/common";
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
      throw new Error("Review not found");
    }

    return await this.commentRepository.insert({
      user_uid: uid,
      contents,
      review,
    });
  }

  // 해당 리뷰 댓글 전체 조회 (review_id)
  async getAllComments(reviewId: number): Promise<Comments[]> {
    return await this.commentRepository.find({
      where: { review: { review_id: reviewId } },
    });
  }

  // 내가 쓴 댓글 조회 (uid)
  async getUserComments(uid: string): Promise<Comments[]> {
    return await this.commentRepository.find({ where: { user_uid: uid } });
  }

  // 댓글 수정
  async editComments(
    commentId: number,
    reviewId: number,
    createCommentDTO: CreateCommentDTO,
    uid: string,
  ) {
    const { contents } = createCommentDTO;
    const review = await this.reviewRepository.findOne({
      where: { review_id: reviewId },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    await this.commentRepository.update(
      { comment_id: commentId, user_uid: uid },
      { contents },
    );
  }

  // 댓글 삭제
  async deleteComment(commentId: number, uid: string) {
    return await this.commentRepository.delete({
      comment_id: commentId,
      user_uid: uid,
    });
  }
}
