import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

// 리뷰 작성 add
// 리뷰 전체 조회 getAll
// 내가 쓴 리뷰 조회 get
// 리뷰 수정 edit
// 리뷰 삭제 delete

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // 리뷰 작성
  @Post()
  @HttpCode(201)
  @UseGuards(FirebaseAuthGuard)
  async addReview(
    @Request() req,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ) {
    const { uid } = req.user;

    return this.reviewsService.addReview(uid, createReviewDTO);
  }

  // type_id (앨범,트랙,아티스트) 리뷰 전체 조회
  @Get(":type_id")
  @HttpCode(200)
  @SkipAuth()
  async getAllReviews(@Param("type_id") typeId: string) {
    return await this.reviewsService.getAllReviews(typeId);
  }

  // 내가 쓴 리뷰 조회
  @Get()
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async getUserReviews(@Request() req) {
    const { uid } = req.user;
    return await this.reviewsService.getUserReviews(uid);
  }

  // 리뷰 수정
  @Put(":review_id")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async editReview(
    @Param("review_id") review_id: number,
    @Request() req,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ) {
    const { uid } = req.user;
    return await this.reviewsService.editReview(
      review_id,
      uid,
      createReviewDTO,
    );
  }

  // 리뷰 삭제
  @Delete(":review_id")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async deleteReview(@Param("review_id") review_id: number, @Request() req) {
    const { uid } = req.user;
    return await this.reviewsService.deleteReview(review_id, uid);
  }
}
