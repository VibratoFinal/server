import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Repository } from "typeorm";
import { CreateReviewDTO } from "./dto/create-reviews.dto";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  // 리뷰 작성
  async addReview(uid: string, review: CreateReviewDTO) {
    try {
      await this.reviewRepository.insert({
        // 임시 uid임. 프론트 연결 후 review.uid와 연결할 것.
        user_uid: uid,
        rated: review.rated,
        contents: review.contents,
        type_id: review.type_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 전체 조회
  async getAllReviews(typeId: number) {
    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .where("reviews.type_id = :typeId", { typeId })
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  // 내가 쓴 리뷰 조회

  // 리뷰 수정
  async editReview(
    reviewId: number,
    review: CreateReviewDTO,
    uid: string,
  ): Promise<void> {
    try {
      await this.reviewRepository.update(
        { review_id: reviewId, user_uid: uid },
        { rated: review.rated, contents: review.contents },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 삭제
  async deleteReview(reviewId: number, uid: string) {
    try {
      return await this.reviewRepository.delete({
        review_id: reviewId,
        user_uid: uid,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
