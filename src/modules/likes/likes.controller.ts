import { Body, Controller, Headers, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { CreateLikesReviewDTO } from "./dto/create-likes-dto";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async addLikeReview(
    @Headers("Authorization") authHeader: string,
    @Body() createLikesReviewDTO: CreateLikesReviewDTO,
  ) {
    try {
      const uid = authHeader.split("Bearer ")[1];
      const like = await this.likesService.addLikeReview(
        uid,
        createLikesReviewDTO,
      );
      return like;
    } catch (error) {
      throw new Error(error);
    }
  }
}
