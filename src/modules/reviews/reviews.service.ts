import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Repository } from "typeorm";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { Comments } from "../comments/entity/comments.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,

    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  // 리뷰 작성
  async addReview(uid: string, review: CreateReviewDTO) {
    await this.reviewRepository.insert({
      user_uid: uid,
      rated: review.rated,
      contents: review.contents,
      type_id: review.type_id,
    });
  }

  // type_id (트랙,앨범,아티스트) 리뷰 전체 조회
  async getAllReviews(typeId: string): Promise<Reviews[]> {
    const allReviews = await this.reviewRepository.find({
      where: { type_id: typeId },
    });
    if (!allReviews.length) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }
    return allReviews;
  }

  async getUserReviews(uid: string): Promise<Reviews[]> {
    const getUid = await this.reviewRepository.find({
      where: { user_uid: uid },
    });
    if (!getUid.length) {
      throw new HttpException("User review not found", HttpStatus.NOT_FOUND);
    }
    return getUid;
  }

  // 리뷰 수정
  async editReview(
    reviewId: number,
    createReviewDTO: CreateReviewDTO,
    uid: string,
  ): Promise<void> {
    const { rated, contents } = createReviewDTO;
    await this.findReview(reviewId, uid);

    const updateReivew = await this.reviewRepository.update(
      { review_id: reviewId, user_uid: uid },
      { rated, contents },
    );

    if (updateReivew.affected === 0) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }
  }

  // 리뷰 삭제
  async deleteReview(reviewId: number, uid: string): Promise<void> {
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
  }

  private async findReview(reviewId: number, uid: string) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        review_id: reviewId,
      },
    });
    // 리뷰가 존재하지 않는 경우 처리
    if (!findReview) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }
    if (findReview.user_uid !== uid) {
      throw new HttpException(
        "Forbidden: You do not have permission to delete Review",
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // type_id를 통한 별점 정보 추출
  public async getRateReview(typeId: string): Promise<[number, number]> {
    const allReviews = await this.reviewRepository.find({
      where: { type_id: typeId },
    });
    console.log(typeId, allReviews.length);
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
