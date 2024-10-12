import { Test, TestingModule } from "@nestjs/testing";
import { LikesController } from "@modules/likes/likes.controller";
import { LikesService } from "./likes.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "../auth/entity/auth.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Comments } from "../comments/entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { LikesType } from "./entity/likesType.entity";

describe("LikesController", () => {
  let controller: LikesController;
  let service: LikesService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LikesController],
      providers: [
        LikesService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(LikesReviews), useValue: {} },
        { provide: getRepositoryToken(LikesComments), useValue: {} },
        { provide: getRepositoryToken(LikesType), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    controller = module.get<LikesController>(LikesController);
    service = module.get<LikesService>(LikesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });

  // describe("addLikeReview", () => {
  //   it("리뷰 좋아요 추가 테스트", async () => {
  //     const authHeader = "Bearer exampleUID";
  //     const createLikesReviewDTO = { review_id: 1 };
  //     const mockLike: InsertResult = {
  //       generatedMaps: [],
  //       raw: {},
  //       identifiers: [{ user_uid: "exampleUID", review_id: 1 }],
  //     };

  //     jest.spyOn(service, "addLikeReview").mockResolvedValue(mockLike);

  //     const result = await controller.addLikeReview(
  //       authHeader,
  //       createLikesReviewDTO,
  //     );
  //     expect(service.addLikeReview).toHaveBeenCalledWith(
  //       "exampleUID",
  //       createLikesReviewDTO,
  //     );
  //     expect(result).toBe(mockLike);
  //   });
  // });
});
