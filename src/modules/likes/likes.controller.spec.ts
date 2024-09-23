import { Test, TestingModule } from "@nestjs/testing";
import { LikesController } from "@modules/likes/likes.controller";
import { LikesService } from "./likes.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "../auth/entity/auth.entity";
import { InsertResult } from "typeorm";

describe("LikesController", () => {
  let controller: LikesController;
  let service: LikesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [
        LikesService,
        {
          provide: getRepositoryToken(LikesReviews),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LikesComments),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LikesController>(LikesController);
    service = module.get<LikesService>(LikesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("addLikeReview", () => {
    it("리뷰 좋아요 추가 테스트", async () => {
      const authHeader = "Bearer exampleUID";
      const createLikesReviewDTO = { review_id: 1 };
      const mockLike: InsertResult = {
        generatedMaps: [],
        raw: {},
        identifiers: [{ user_uid: "test-uid", review_id: 1 }],
      };

      jest.spyOn(service, "addLikeReview").mockResolvedValue(mockLike);

      const result = await controller.addLikeReview(
        authHeader,
        createLikesReviewDTO,
      );
      expect(service.addLikeReview).toHaveBeenCalledWith(
        "exampleUID",
        createLikesReviewDTO,
      );
      expect(result).toBe(mockLike);
    });
  });
});
