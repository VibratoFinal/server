import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsService } from "./reviews.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateReviewDTO } from "./dto/create-reviews.dto";
import { LikesService } from "../likes/likes.service";
import { LikesReviews } from "../likes/entity/likesReview.entity";
import { LikesComments } from "../likes/entity/likesComment.entity";
import { LikesType } from "../likes/entity/likesType.entity";

describe("ReivewsService", () => {
  let reviewsService: ReviewsService;
  let firebaseService: FirebaseService;
  let commentsRepository: Repository<Comments>;
  let reviewsRepository: Repository<Reviews>;
  let usersRepository: Repository<Users>;

  const req = { user: { uid: "mock-uid" } };
  const reviewId = 1;
  const typeId = "112cd";
  const createReviewDTO: CreateReviewDTO = {
    rated: 4,
    title: "리뷰 제목 ",
    contents: "리뷰 테스트",
    type_id: "112cd",
  };
  const mockUserReviews: Reviews = {
    review_id: 1,
    user_uid: "mock-uid",
    rated: 5,
    title: "리뷰 테스트 제목",
    contents: "리뷰 테스트",
    type_id: "112cd",
    created_at: new Date(),
    updated_at: new Date(),
    comments: null,
    likes: [],
  };

  const mockAllReviews: Reviews[] = [
    {
      review_id: 1,
      user_uid: "mock-uid",
      rated: 5,
      title: "리뷰 테스트 제목",
      contents: "리뷰 테스트",
      type_id: "112cd",
      created_at: new Date(),
      updated_at: new Date(),
      comments: null,
      likes: [],
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        LikesService,
        { provide: FirebaseService, useValue: {} },
        {
          provide: getRepositoryToken(Reviews),
          useValue: {
            insert: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Comments),
          useValue: {
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LikesReviews),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LikesComments),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LikesType),
          useValue: {},
        },
      ],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
    commentsRepository = module.get<Repository<Comments>>(
      getRepositoryToken(Comments),
    );
    reviewsRepository = module.get<Repository<Reviews>>(
      getRepositoryToken(Reviews),
    );
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it("should be defined", () => {
    expect(reviewsService).toBeDefined();
    expect(firebaseService).toBeDefined();
    expect(commentsRepository).toBeDefined();
    expect(reviewsRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe("addReview", () => {
    it("리뷰작성 테스트", async () => {
      const mockInsertReviewResult: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };
      jest
        .spyOn(reviewsRepository, "insert")
        .mockResolvedValue(mockInsertReviewResult);

      const mockUser: Users = {
        id: 1,
        uid: "mock-uid",
        profileImage: "test_image.png",
        nickname: "Test User",
        created_at: new Date(),
      };
      jest.spyOn(usersRepository, "findOne").mockResolvedValue(mockUser);

      const result = await reviewsService.addReview(
        mockUser.uid,
        createReviewDTO,
      );
      expect(result).toBe(mockInsertReviewResult);
      expect(reviewsRepository.insert).toHaveBeenCalledWith({
        user_uid: mockUser.uid,
        rated: createReviewDTO.rated,
        title: createReviewDTO.title,
        type_id: createReviewDTO.type_id,
        contents: createReviewDTO.contents,
      });
    });
  });

  describe("getAllReviews", () => {
    it("리뷰 전체 조회 테스트", async () => {
      jest.spyOn(reviewsRepository, "find").mockResolvedValue(mockAllReviews);

      const result = await reviewsService.getAllReviews(req.user.uid, typeId);
      expect(result).toEqual(mockAllReviews);
    });
  });

  describe("getUserReviews", () => {
    it("내가 쓴 리뷰 조회 테스트", async () => {
      jest.spyOn(reviewsRepository, "find").mockResolvedValue(mockAllReviews);

      const result = await reviewsService.getUserReviews(req.user.uid);
      expect(result).toEqual(mockAllReviews);
    });
  });

  describe("editComments", () => {
    it("리뷰 수정 테스트", async () => {
      const mockEditReview: UpdateResult = {
        generatedMaps: [],
        raw: {},
        affected: 1,
      };

      jest.spyOn(reviewsRepository, "update").mockResolvedValue(mockEditReview);

      jest
        .spyOn(reviewsRepository, "findOne")
        .mockResolvedValue(mockUserReviews);

      const result = await reviewsService.editReview(
        reviewId,
        req.user.uid,
        createReviewDTO,
      );
      expect(reviewsRepository.update).toHaveBeenCalledWith(
        { review_id: reviewId, user_uid: req.user.uid },
        { rated: createReviewDTO.rated, contents: createReviewDTO.contents },
      );
      expect(result).toEqual(mockEditReview);
    });
  });

  describe("deleteComment", () => {
    it("댓글 삭제 테스트", async () => {
      const mockDeleteReview: DeleteResult = {
        raw: {},
        affected: 1,
      };

      jest
        .spyOn(reviewsRepository, "findOne")
        .mockResolvedValue(mockUserReviews);
      jest.spyOn(commentsRepository, "delete").mockResolvedValue({
        raw: {},
        affected: 1,
      });
      jest
        .spyOn(reviewsRepository, "delete")
        .mockResolvedValue(mockDeleteReview);

      const result = await reviewsService.deleteReview(reviewId, req.user.uid);
      expect(reviewsRepository.delete).toHaveBeenCalledWith({
        review_id: reviewId,
      });
      expect(result).toEqual(mockDeleteReview);
    });
  });
});
