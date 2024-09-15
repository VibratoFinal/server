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
      await this.reviewRepository
        .createQueryBuilder("reviews")
        .insert()
        .values({
          // 임시 uid임. 프론트 연결 후 review.uid와 연결할 것.
          user_uid: uid,
          rated: review.rated,
          contents: review.contents,
          type_id: review.type_id,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 전체 조회
  async getReviews() {
    try {
      const getReviews = await this.reviewRepository
        .createQueryBuilder("reviews")
        .select("reviews")
        .getMany();

      return getReviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 수정
  async editReview(reviewId: Reviews, review: CreateReviewDTO, uid: string) {
    try {
      await this.reviewRepository
        .createQueryBuilder()
        .update()
        .set({ rated: review.rated, contents: review.contents })
        .where("reviews.review_id = :review_id AND reviews.user_uid = :uid", {
          review_id: reviewId,
          uid: uid,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 삭제
  async deleteReview(reviewId: Reviews, uid: string) {
    try {
      const deleteReview = await this.reviewRepository
        .createQueryBuilder()
        .delete()
        .from("reviews")
        .where("reviews.review_id = :review_id AND reviews.user_uid = :uid", {
          review_id: reviewId,
          uid: uid,
        })
        .execute();

      return deleteReview;
    } catch (error) {
      throw new Error(error);
    }
  }
}
