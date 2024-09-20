import { Injectable } from "@nestjs/common";
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

  async addLikeReview(uid: string, createLikesReviewDTO: CreateLikesReviewDTO) {
    try {
      const user = await this.usersRepository.findOne({
        where: { uid },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const { review_id } = createLikesReviewDTO;

      return await this.likesReviewRepository.insert({
        user_uid: user,
        review_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addLikeComment(
    uid: string,
    createLikesCommentDTO: CreateLikesCommentDTO,
  ) {
    try {
      const { review_id, comment_id } = createLikesCommentDTO;
      const user = await this.usersRepository.findOne({
        where: { uid },
      });
      if (!user) {
        throw new Error("User not found");
      }

      return await this.likesCommentRepository.insert({
        user_uid: user,
        review_id,
        comment_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
