import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from "@nestjs/common";
// import { UsersService } from "src/users/users.service";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { Reviews } from "./entity/reviews.entity";

// 리뷰 작성 add
// 리뷰 전체 조회 get
// 리뷰 수정 edit
// 리뷰 삭제 delete

@Controller("reviews")
export class ReviewsController {
  constructor(
    // private readonly usersService: UsersService  // uid 사용할 때 사용할 것
    private readonly reviewsService: ReviewsService,
  ) {}
  @Post()
  async createReview(
    @Headers("Authorization") authHeader: string,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ) {
    try {
      return this.reviewsService.addReview(authHeader, createReviewDTO);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  async getReviews() {
    const getReviews = await this.reviewsService.getReviews();

    return getReviews;
  }

  @Put(":reviewId")
  async editReview(
    @Param("reviewId") reviewId: Reviews,
    @Headers("Authorization") authHeader: string,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ) {
    try {
      await this.reviewsService.editReview(
        reviewId,
        createReviewDTO,
        authHeader,
      );
      return { message: "Review 수정 완료" };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(":reviewId")
  async deleteReview(
    @Param("reviewId") reviewId: Reviews,
    @Headers("Authorization") authHeader: string,
  ) {
    await this.reviewsService.deleteReview(reviewId, authHeader);
    return { message: "Review 삭제 완료" };
  }
}
