import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { Repository } from "typeorm";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "../auth/entity/auth.entity";
import {
  CreateLikesCommentDTO,
  CreateLikesReviewDTO,
} from "./dto/create-likes-dto";

// 리뷰 좋아요 추가, 삭제
// 댓글 좋아요 추가, 삭제

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesReviews)
    private likesReviewRepository: Repository<LikesReviews>,
    @InjectRepository(LikesComments)
    private likesCommentRepository: Repository<LikesComments>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  private async findUserByUid(uid: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async addLikeReview(uid: string, createLikesReviewDTO: CreateLikesReviewDTO) {
    try {
      const user = await this.findUserByUid(uid);
      const { review_id } = createLikesReviewDTO;

      return await this.likesReviewRepository.insert({
        user_uid: user,
        review_id,
      });
    } catch (error) {
      throw new Error(`Failed to add like to review: ${error.message}`);
    }
  }

  async addLikeComment(
    uid: string,
    createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    try {
      const user = await this.findUserByUid(uid);
      const { review_id, comment_id } = createLikesCommentDTO;

      return await this.likesCommentRepository.insert({
        user_uid: user,
        review_id,
        comment_id,
      });
    } catch (error) {
      throw new Error(`Failed to add like to review: ${error.message}`);
    }
  }

  async removeLikeReview(
    uid: string,
    createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    try {
      const user = await this.findUserByUid(uid);
      const { review_id } = createLikesReviewDTO;

      return await this.likesReviewRepository.delete({
        user_uid: user,
        review_id,
      });
    } catch (error) {
      throw new Error(`Failed to remove like to review: ${error.message}`);
    }
  }

  async removeLikeComment(
    uid: string,
    createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    try {
      const user = await this.findUserByUid(uid);
      const { review_id, comment_id } = createLikesCommentDTO;

      return await this.likesCommentRepository.delete({
        user_uid: user,
        review_id,
        comment_id,
      });
    } catch (error) {
      throw new Error(`Failed to remove like to comment: ${error.message}`);
    }
  }
}
