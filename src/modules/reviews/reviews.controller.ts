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
// 리뷰 작성 add
// 리뷰 전체 조회 getAll
// 내가 쓴 리뷰 조회 get
// 리뷰 수정 edit
// 리뷰 삭제 delete

@Controller("reviews")
export class ReviewsController {
  constructor(
    // private readonly usersService: UsersService  // uid 사용할 때 사용할 것
    private readonly reviewsService: ReviewsService,
  ) {}

  // 리뷰 작성
  @Post()
  async addReview(
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

  // type_id (앨범,트랙,아티스트) 리뷰 전체 조회
  @Get(":type_id")
  async getAllReviews(@Param("type_id") typeId: number) {
    try {
      return await this.reviewsService.getAllReviews(typeId);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 내가 쓴 리뷰 조회
  @Get()
  async getUserReviews(@Headers("Authorization") authHeader: string) {
    try {
      return await this.reviewsService.getUserReviews(authHeader);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 수정
  @Put(":review_id")
  async editReview(
    @Param("review_id") review_id: number,
    @Headers("Authorization") authHeader: string,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ) {
    try {
      await this.reviewsService.editReview(
        review_id,
        createReviewDTO,
        authHeader,
      );
      return { message: "Review 수정 완료" };
    } catch (error) {
      throw new Error(error);
    }
  }

  // 리뷰 삭제
  @Delete(":review_id")
  async deleteReview(
    @Param("review_id") review_id: number,
    @Headers("Authorization") authHeader: string,
  ) {
    await this.reviewsService.deleteReview(review_id, authHeader);
    return { message: "Review 삭제 완료" };
  }
}
