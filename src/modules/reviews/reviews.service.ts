import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { Comments } from "../comments/entity/comments.entity";
import { Users } from "../auth/entity/auth.entity";
import { LikesService } from "../likes/likes.service";

export class SimpleLikesReviews {
  id: number;
  user_uid: string;
}

export class CreateResponseReviewDTO {
  review_id: number;
  user_uid: string;
  nickname: string;
  rated: number;
  title: string;
  contents: string;
  type_id: string;
  created_at: Date;
  updated_at: Date;
  comments: Comments[];
  likes: SimpleLikesReviews[];
  liked: boolean;
  numOfLikes?: number;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,

    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private readonly likesService: LikesService,
  ) {}

  private async findUserByUid(uid: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { uid } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // 사이트 모든 리뷰 전체 조회
  async getAllReviewsinSite(uid: string): Promise<CreateResponseReviewDTO[]> {
    const allReviews = await this.reviewRepository.find();

    if (!allReviews.length) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    const reviews = await Promise.all(
      allReviews.map(async review => {
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: review.type_id,
            })
          : false;
        const nickname = await this.findNickname(uid);

        return {
          review_id: review.review_id,
          user_uid: review.user_uid,
          nickname: nickname,
          rated: review.rated,
          title: review.title,
          contents: review.contents,
          type_id: review.type_id,
          created_at: review.created_at,
          updated_at: review.updated_at,
          comments: review.comments,
          likes: review.likes.map(like => ({
            id: like.id,
            user_uid: like.user.uid,
          })),
          numOfLikes: review.likes.length,
          liked,
        };
      }),
    );

    return reviews;
  }

  // 리뷰 작성
  async addReview(uid: string, review: CreateReviewDTO): Promise<InsertResult> {
    const user = await this.findUserByUid(uid);

    return await this.reviewRepository.insert({
      user_uid: user.uid,
      rated: review.rated,
      title: review.title,
      contents: review.contents,
      type_id: review.type_id,
    });
  }

  // type_id (트랙,앨범,아티스트) 리뷰 전체 조회
  async getAllReviews(
    uid: string,
    typeId: string,
  ): Promise<CreateResponseReviewDTO[]> {
    const allReviews = await this.reviewRepository.find({
      where: { type_id: typeId },
    });

    if (!allReviews.length) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    const reviewsWithLikes = await Promise.all(
      allReviews.map(async review => {
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: review.type_id,
            })
          : false;
        const nickname = await this.findNickname(review.user_uid);

        return {
          review_id: review.review_id,
          nickname: nickname,
          user_uid: review.user_uid,
          rated: review.rated,
          title: review.title,
          contents: review.contents,
          type_id: review.type_id,
          created_at: review.created_at,
          updated_at: review.updated_at,
          comments: review.comments,
          likes: review.likes.map(like => ({
            id: like.id,
            user_uid: like.user.uid,
          })),
          liked,
        };
      }),
    );

    return reviewsWithLikes;
  }

  // 특정 리뷰조회
  async getReviews(
    uid: string,
    reviewId: number,
  ): Promise<CreateResponseReviewDTO> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: reviewId },
    });
    console.log("특정리뷰 조회", uid, reviewId);

    if (!review) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    const liked = uid
      ? await this.likesService.checkLikeReviewId(uid, { review_id: reviewId })
      : false;

    const nickname = await this.findNickname(review.user_uid);

    return {
      review_id: review.review_id,
      nickname: nickname,
      user_uid: review.user_uid,
      rated: review.rated,
      title: review.title,
      contents: review.contents,
      type_id: review.type_id,
      created_at: review.created_at,
      updated_at: review.updated_at,
      comments: review.comments,
      likes: review.likes.map(like => ({
        id: like.id,
        user_uid: like.user.uid,
      })),
      liked,
    };
  }

  async getUserReviews(uid: string): Promise<CreateResponseReviewDTO[]> {
    const getUid = await this.reviewRepository.find({
      where: { user_uid: uid },
    });
    if (!getUid.length) {
      throw new HttpException("User review not found", HttpStatus.NOT_FOUND);
    }
    const reviewsWithLikes = await Promise.all(
      getUid.map(async review => {
        const liked = uid
          ? await this.likesService.checkLikeTypeid(uid, {
              type_id: review.type_id,
            })
          : false;
        const nickname = await this.findNickname(uid);

        return {
          review_id: review.review_id,
          nickname,
          user_uid: review.user_uid,
          rated: review.rated,
          title: review.title,
          contents: review.contents,
          type_id: review.type_id,
          created_at: review.created_at,
          updated_at: review.updated_at,
          comments: review.comments,
          likes: review.likes.map(like => ({
            id: like.id,
            user_uid: like.user.uid,
          })),
          liked,
        };
      }),
    );

    return reviewsWithLikes;
  }

  // 리뷰 수정
  async editReview(
    reviewId: number,
    uid: string,
    createReviewDTO: CreateReviewDTO,
  ): Promise<UpdateResult> {
    const { rated, contents } = createReviewDTO;
    await this.findReview(reviewId, uid);

    const updateReivew = await this.reviewRepository.update(
      { review_id: reviewId, user_uid: uid },
      { rated, contents },
    );

    if (updateReivew.affected === 0) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    return updateReivew;
  }

  // 리뷰 삭제
  async deleteReview(reviewId: number, uid: string): Promise<DeleteResult> {
    await this.findReview(reviewId, uid);

    const deleteComments = await this.commentRepository.delete({
      review: { review_id: reviewId },
    });

    if (deleteComments.affected === 0) {
      console.log("No comments found for this review");
    }

    const deleteReview = await this.reviewRepository.delete({
      review_id: reviewId,
    });

    if (deleteReview.affected === 0) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    return deleteReview;
  }

  private async findReview(reviewId: number, uid: string): Promise<Reviews> {
    const review = await this.reviewRepository.findOne({
      where: {
        review_id: reviewId,
      },
    });
    // 리뷰가 존재하지 않는 경우 처리
    if (!review) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }
    if (review.user_uid !== uid) {
      throw new HttpException(
        "Forbidden: You do not have permission to delete Review",
        HttpStatus.FORBIDDEN,
      );
    }

    return review;
  }

  //닉네임추출
  public async findNickname(uid: string) {
    const getNickname = await this.usersRepository.findOne({ where: { uid } });
    console.log("getNickname", getNickname);

    return getNickname.nickname;
  }

  // type_id를 통한 별점 정보 추출
  public async getRateReview(typeId: string): Promise<[number, number]> {
    const allReviews = await this.reviewRepository.find({
      where: { type_id: typeId },
    });
    if (!typeId) {
      return [0, 0];
    }

    if (!allReviews.length) {
      return [0, 0];
    }
    let avgRate = 0;

    for (const review of allReviews) {
      avgRate += review.rated;
    }
    avgRate /= allReviews.length;

    return [avgRate, allReviews.length];
  }
}
