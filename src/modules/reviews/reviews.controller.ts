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
import { CreateResponseReviewDTO, ReviewsService } from "./reviews.service";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";
import { getUid } from "@/common/utils/helpers";

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

  // 사이트 전체 리뷰 조회
  @Get("/all")
  @HttpCode(200)
  @SkipAuthOptional()
  async getAllReviewsinSite(@Request() req) {
    const uid = getUid(req);
    return await this.reviewsService.getAllReviewsinSite(uid);
  }

  // 내가 쓴 리뷰 조회 -- user_uid
  @Get()
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async getUserReviews(@Request() req) {
    const { uid } = req.user;
    return await this.reviewsService.getUserReviews(uid);
  }

  // type_id (앨범,트랙,아티스트) 리뷰 전체 조회 -- user_uid ? type_id
  @Get(":type_id")
  @HttpCode(200)
  @SkipAuthOptional()
  async getAllReviews(
    @Request() req,
    @Param("type_id") type_id: string,
  ): Promise<CreateResponseReviewDTO[]> {
    const uid = req.user ? req.user.uid : null;
    console.log("reviewsController", uid);

    return await this.reviewsService.getAllReviews(uid, type_id);
  }

  // 리뷰조회 -- review_id
  @Get("/review/:review_id")
  @HttpCode(200)
  @SkipAuthOptional()
  async getReviews(
    @Request() req,
    @Param("review_id") review_id: number,
  ): Promise<CreateResponseReviewDTO> {
    const uid = req.user ? req.user.uid : null;
    console.log("리뷰조회 conroller", uid);
    console.log("리뷰조회 conroller", review_id);

    return await this.reviewsService.getReviews(uid, review_id);
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
