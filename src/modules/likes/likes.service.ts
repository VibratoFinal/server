import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { DeleteResult, InsertResult, Repository } from "typeorm";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "@modules/auth/entity/auth.entity";
import {
  CreateLikesCommentDTO,
  CreateLikesReviewDTO,
  CreateLikesTypeDTO,
} from "./dto/create-likes-dto";
import { LikesType } from "./entity/likesType.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";

// 리뷰 좋아요 추가, 삭제
// 댓글 좋아요 추가, 삭제

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesReviews)
    private likesReviewRepository: Repository<LikesReviews>,
    @InjectRepository(LikesComments)
    private likesCommentRepository: Repository<LikesComments>,
    @InjectRepository(LikesType)
    private likesTypeRepository: Repository<LikesType>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  private async findUserByUid(uid: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { uid } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addLikeReview(
    uid: string,
    createLikesReviewDTO: CreateLikesReviewDTO,
  ): Promise<InsertResult> {
    const { review_id } = createLikesReviewDTO;

    const findReview = await this.reviewRepository.findOne({
      where: { review_id },
    });

    if (!findReview) {
      throw new HttpException("review not found", HttpStatus.NOT_FOUND);
    }
    const user = await this.findUserByUid(uid);
    try {
      return await this.likesReviewRepository.insert({
        user_uid: user.uid,
        review_id: findReview,
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new HttpException("Already add LikeReview", HttpStatus.CONFLICT);
      }
    }
  }

  async addLikeComment(
    uid: string,
    createLikesCommentDTO: CreateLikesCommentDTO,
  ): Promise<InsertResult> {
    const { review_id, comment_id } = createLikesCommentDTO;
    const findReview = await this.reviewRepository.findOne({
      where: { review_id },
    });
    const findComment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (!findReview || !findComment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.findUserByUid(uid);
    try {
      return await this.likesCommentRepository.insert({
        user_uid: user,
        review_id: findReview,
        comment_id: findComment,
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new HttpException("Already add LikeComment", HttpStatus.CONFLICT);
      }
    }
  }

  async deleteLikeReview(
    uid: string,
    createLikesReviewDTO: CreateLikesReviewDTO,
  ): Promise<DeleteResult> {
    const user = await this.findUserByUid(uid);
    const { review_id } = createLikesReviewDTO;
    const findReview = await this.reviewRepository.findOne({
      where: { review_id },
    });

    const deleteLikeReview = await this.likesReviewRepository.delete({
      user_uid: user.uid,
      review_id: findReview,
    });

    if (deleteLikeReview.affected === 0) {
      throw new HttpException(
        "DELETE Like Review Not Found",
        HttpStatus.NOT_FOUND,
      );
    }

    return deleteLikeReview;
  }

  async deleteLikeComment(
    uid: string,
    createLikesCommentDTO: CreateLikesCommentDTO,
  ): Promise<DeleteResult> {
    const user = await this.findUserByUid(uid);
    const { review_id, comment_id } = createLikesCommentDTO;
    const findReview = await this.reviewRepository.findOne({
      where: { review_id },
    });
    const findComment = await this.commentRepository.findOne({
      where: { comment_id },
    });

    const deleteLikeComment = await this.likesCommentRepository.delete({
      user_uid: user,
      review_id: findReview,
      comment_id: findComment,
    });

    if (deleteLikeComment.affected === 0) {
      throw new HttpException("Like Comment Error", HttpStatus.NOT_FOUND);
    }
    return deleteLikeComment;
  }

  async checkLikeReviewId(uid: string, reviewId: number): Promise<boolean> {
    const user = await this.findUserByUid(uid);

    try {
      const results = await this.likesReviewRepository.find({
        where: {
          id: reviewId,
        },
      });
      console.log(results);
      for (const result of results) {
        if (result.user_uid === user.uid) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error(
        `Error happens while finding whether ${user.nickname} like ${reviewId} :`,
        error,
      );
      throw new HttpException(
        `Error happens while finding whether ${user.nickname} like ${reviewId}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkLikeCommentId(
    uid: string,
    review_id: number,
    comment_id: number,
  ): Promise<boolean> {
    const user = await this.findUserByUid(uid);
    try {
      const findReview = await this.reviewRepository.findOne({
        where: { review_id },
      });
      const findComment = await this.commentRepository.findOne({
        where: { comment_id },
      });
      const results = await this.likesCommentRepository.find({
        where: {
          comment_id: findComment,
          review_id: findReview,
        },
      });
      for (const result of results) {
        if (result.user_uid.uid === user.uid) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error(
        `Error happens while finding whether ${user.nickname} like ${review_id} :`,
        error,
      );
      throw new HttpException(
        `Error happens while finding whether ${user.nickname} like ${review_id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // type_id 좋아요 추가
  async addLikeType(uid: string, createLikesTypeDTO: CreateLikesTypeDTO) {
    const type_id = createLikesTypeDTO.type_id;
    const user = await this.findUserByUid(uid);
    const bool = await this.checkLikeTypeid(uid, createLikesTypeDTO);
    if (bool) {
      throw new HttpException(
        `${user.nickname} already liked ${type_id}.`,
        HttpStatus.CONFLICT,
      );
    }

    try {
      return await this.likesTypeRepository.insert({
        user_uid: user,
        type_id,
      });
    } catch (error) {
      console.error(`Error happens while ${user} like ${type_id} :`, error);
      throw new HttpException(
        `Error happens while ${user.nickname} like ${type_id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // type_id 좋아요 제거
  async deleteLikeType(uid: string, createLikesTypeDTO: CreateLikesTypeDTO) {
    const type_id = createLikesTypeDTO.type_id;
    const user = await this.findUserByUid(uid);
    try {
      const bool = await this.checkLikeTypeid(uid, createLikesTypeDTO);
      if (!bool) {
        throw new HttpException(
          `Already ${user.nickname} doesn't like ${type_id}`,
          HttpStatus.CONFLICT,
        );
      }

      return await this.likesTypeRepository.delete({
        user_uid: user,
        type_id,
      });
    } catch (error) {
      console.error(`Error happens while ${user} dislike ${type_id} :`, error);
      throw new HttpException(
        `Error happens while ${user.nickname} dislike ${type_id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // user가 type_id 좋아하는지 체크
  async checkLikeTypeid(uid: string, createLikesTypeDTO: CreateLikesTypeDTO) {
    const user = await this.findUserByUid(uid);
    const type_id = createLikesTypeDTO.type_id;
    try {
      const results = await this.likesTypeRepository.find({
        where: {
          type_id,
        },
      });
      console.log(results);

      for (const result of results) {
        if (result.user_uid.uid === user.uid) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error(
        `Error happens while finding whether ${user.nickname} like ${type_id} :`,
        error,
      );
      throw new HttpException(
        `Error happens while finding whether ${user.nickname} like ${type_id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
