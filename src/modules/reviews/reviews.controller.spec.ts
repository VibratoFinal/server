import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsController } from "./reviews.controller";
import { CreateResponseReviewDTO, ReviewsService } from "./reviews.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { LikesService } from "../likes/likes.service";

describe("ReviewsController", () => {
  let controller: ReviewsController;
  let reviewsService: ReviewsService;
  let firebaseService: FirebaseService;

  const req = { user: { uid: "mock-uid" } };
  const reviewId = 1;
  const typeId = "112cd";
  const createReviewDTO: CreateReviewDTO = {
    rated: 4,
    title: "리뷰 제목 ",
    contents: "리뷰 테스트",
    type_id: "112cd",
  };

  const mockAllReviews: CreateResponseReviewDTO[] = [
    {
      review_id: 1,
      user_uid: "mock-uid",
      nickname: "test",
      rated: 5,
      title: "리뷰 테스트 제목",
      contents: "리뷰 테스트",
      type_id: "112cd",
      created_at: new Date(),
      updated_at: new Date(),
      comments: null,
      likes: [],
      liked: false,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        { provide: FirebaseService, useValue: {} },
        { provide: LikesService, useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(reviewsService).toBeDefined();
    expect(firebaseService).toBeDefined();
  });

  describe("addReview", () => {
    it("리뷰작성 테스트", async () => {
      const mockAddReview: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };

      jest.spyOn(reviewsService, "addReview").mockResolvedValue(mockAddReview);
      const result = await controller.addReview(req, createReviewDTO);
      expect(reviewsService.addReview).toHaveBeenCalledWith(
        req.user.uid,
        createReviewDTO,
      );
      expect(result).toBe(mockAddReview);
    });
  });

  describe("getAllReviews", () => {
    it("리뷰 전체 조회 테스트", async () => {
      jest
        .spyOn(reviewsService, "getAllReviews")
        .mockResolvedValue(mockAllReviews);
      const result = await controller.getAllReviews(req, typeId);

      expect(reviewsService.getAllReviews).toHaveBeenCalledWith(
        req.user.uid,
        typeId,
      );
      expect(result).toEqual(mockAllReviews);
    });
  });

  describe("getUserReviews", () => {
    it("내가 쓴 리뷰 조회 테스트", async () => {
      jest
        .spyOn(reviewsService, "getUserReviews")
        .mockResolvedValue(mockAllReviews);

      const result = await controller.getUserReviews(req);

      expect(reviewsService.getUserReviews).toHaveBeenCalledWith(req.user.uid);
      expect(result).toBe(mockAllReviews);
    });
  });

  describe("editReviews", () => {
    const mockEditReview: UpdateResult = {
      generatedMaps: [],
      raw: {},
      affected: 1,
    };
    it("리뷰 수정 테스트", async () => {
      jest
        .spyOn(reviewsService, "editReview")
        .mockResolvedValue(mockEditReview);
      const result = await controller.editReview(
        reviewId,
        req,
        createReviewDTO,
      );
      expect(reviewsService.editReview).toHaveBeenCalledWith(
        reviewId,
        req.user.uid,
        createReviewDTO,
      );
      expect(result).toBe(mockEditReview);
    });
  });

  describe("deleteComments", () => {
    it("리뷰 삭제 테스트", async () => {
      const mockDeleteComment: DeleteResult = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(reviewsService, "deleteReview")
        .mockResolvedValue(mockDeleteComment);
      const result = await controller.deleteReview(reviewId, req);
      expect(reviewsService.deleteReview).toHaveBeenCalledWith(
        reviewId,
        req.user.uid,
      );
      expect(result).toBe(mockDeleteComment);
    });
  });
});
