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
import { DeleteResult, InsertResult } from "typeorm";
import { ReviewsService } from "../reviews/reviews.service";

describe("LikesController", () => {
  let controller: LikesController;
  let likesService: LikesService;
  let firebaseService: FirebaseService;

  const req = { user: { uid: "mock-uid" } };
  const createLikesReviewDTO = { review_id: 1 };
  const createLikesCommentDTO = { review_id: 1, comment_id: 2 };

  const mockReview: Reviews = {
    review_id: 1,
    user_uid: "mock-uid",
    rated: 5,
    title: "test",
    contents: "test",
    type_id: "112cd",
    created_at: new Date(),
    updated_at: new Date(),
    comments: [],
    likes: [],
  };

  const mockComments: Comments = {
    comment_id: 1,
    user_uid: "mock-uid",
    nickname: "nickname",
    contents: "내가 쓴 댓글 조회 테스트",
    created_at: new Date(),
    updated_at: new Date(),
    likes: [],
    review: null,
  };

  const mockUser: Users = {
    id: 1,
    uid: "mock-uid",
    profileImage: "testImage.png",
    nickname: "test",
    created_at: new Date(),
  };
  const mockLikeReview: LikesReviews[] = [
    {
      id: 1,
      user: mockUser,
      review: mockReview,
    },
  ];

  const mockLikeComment: LikesComments[] = [
    {
      id: 1,
      user: mockUser,
      review: mockReview,
      comment: mockComments,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LikesController],
      providers: [
        ReviewsService,
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
    likesService = module.get<LikesService>(LikesService);
  });

  it("should be LikeController", () => {
    expect(controller).toBeDefined();
    expect(likesService).toBeDefined();
    expect(firebaseService).toBeDefined();
  });

  describe("AddLikeReview", () => {
    it("리뷰 좋아요 테스트", async () => {
      const mockAddLikeReview: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(likesService, "addLikeReview")
        .mockResolvedValue(mockAddLikeReview);
      const result = await controller.addLikeReview(req, createLikesReviewDTO);
      expect(likesService.addLikeReview).toHaveBeenCalledWith(
        req.user.uid,
        createLikesReviewDTO,
      );
      expect(result).toBe(mockAddLikeReview);
    });
  });
  describe("DeleteLikeReview", () => {
    it("리뷰 좋아요 취소 테스트", async () => {
      const mockDeleteReview: DeleteResult = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(likesService, "deleteLikeReview")
        .mockResolvedValue(mockDeleteReview);
      const result = await controller.deleteLikeReview(
        req,
        createLikesReviewDTO,
      );
      expect(likesService.deleteLikeReview).toHaveBeenCalledWith(
        req.user.uid,
        createLikesReviewDTO,
      );
      expect(result).toBe(mockDeleteReview);
    });
  });

  // describe("GetLikeReview", () => {
  //   it("리뷰 좋아요 조회 테스트", async () => {
  //     jest
  //       .spyOn(likesService, "checkLikeReviewId")
  //       .mockResolvedValue(mockLikeReview);

  //     const result = await controller.getLikeReview(req, createLikesReviewDTO);
  //     expect(likesService.checkLikeReviewId).toHaveBeenCalledWith(
  //       req.user.uid,
  //       createLikesReviewDTO,
  //     );
  //     expect(result).toBe(mockLikeReview);
  //   });
  // });

  describe("AddLikeComment", () => {
    it("댓글 좋아요 테스트", async () => {
      const mockAddLikeComment: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(likesService, "addLikeComment")
        .mockResolvedValue(mockAddLikeComment);
      const result = await controller.addLikeComment(
        req,
        createLikesCommentDTO,
      );
      expect(likesService.addLikeComment).toHaveBeenCalledWith(
        req.user.uid,
        createLikesCommentDTO,
      );
      expect(result).toBe(mockAddLikeComment);
    });
  });

  describe("DeleteLikeComment", () => {
    it("댓글 좋아요 취소 테스트", async () => {
      const mockDeleteComment: DeleteResult = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(likesService, "deleteLikeComment")
        .mockResolvedValue(mockDeleteComment);
      const result = await controller.deleteLikeComment(
        req,
        createLikesCommentDTO,
      );
      expect(likesService.deleteLikeComment).toHaveBeenCalledWith(
        req.user.uid,
        createLikesCommentDTO,
      );
      expect(result).toBe(mockDeleteComment);
    });
  });

  // describe("GetLikeComment", () => {
  //   it("댓글 좋아요 조회 테스트", async () => {
  //     jest
  //       .spyOn(likesService, "checkLikeCommentId")
  //       .mockResolvedValue(mockLikeComment);

  //     const result = await controller.getLikeComment(
  //       req,
  //       createLikesCommentDTO.review_id,
  //       createLikesCommentDTO.comment_id,
  //     );
  //     expect(likesService.checkLikeCommentId).toHaveBeenCalledWith(
  //       req.user.uid,
  //       createLikesCommentDTO.review_id,
  //       createLikesCommentDTO.comment_id,
  //     );
  //     expect(result).toBe(mockLikeComment);
  //   });
  // });

  describe("AddLikeType", () => {
    it("타입 좋아요 테스트", async () => {});
  });

  describe("DeleteLikeType", () => {
    it("타입 좋아요 취소 테스트", async () => {});
  });
  describe("GetLikeType", () => {
    it("타입 좋아요 조회 테스트", async () => {});
  });
});
