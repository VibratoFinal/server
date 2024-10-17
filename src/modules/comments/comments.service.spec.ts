import { Test, TestingModule } from "@nestjs/testing";
import {
  CommentsService,
  CreateResponseCommentDTO,
} from "@modules/comments/comments.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { ReviewsService, SimpleLikesReviews } from "../reviews/reviews.service";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { LikesService } from "../likes/likes.service";
import { LikesReviews } from "../likes/entity/likesReview.entity";
import { LikesComments } from "../likes/entity/likesComment.entity";
import { LikesType } from "../likes/entity/likesType.entity";

describe("CommentsService", () => {
  let commentsService: CommentsService;
  let firebaseService: FirebaseService;
  let commentsRepository: Repository<Comments>;
  let reviewsRepository: Repository<Reviews>;
  let usersRepository: Repository<Users>;
  let likesService: LikesService;
  let reviewsService: ReviewsService;
  let likesReviewsRepository: Repository<LikesReviews>;
  let likesCommentsRepository: Repository<LikesComments>;
  let likesTypeRepository: Repository<LikesType>;
  const req = { user: { uid: "mock-uid" } };
  const reviewId = 1;
  const commentId = 2;
  const createCommentDTO: CreateCommentDTO = { contents: "댓글 테스트" };
  const simpleLikesReviews: SimpleLikesReviews[] = [
    {
      id: 1,
      user_uid: "mock-uid",
    },
  ];

  const mockUserComments: CreateResponseCommentDTO[] = [
    {
      comment_id: commentId,
      user_uid: req.user.uid,
      nickname: "test",
      contents: "댓글 테스트",
      created_at: new Date(),
      updated_at: new Date(),
      likes: [],
      liked: false,
    },
  ];
  const mockUserComment: CreateResponseCommentDTO = {
    comment_id: commentId,
    user_uid: "mock-uid",
    nickname: "test",
    contents: "댓글 테스트",
    created_at: new Date(),
    updated_at: new Date(),
    likes: simpleLikesReviews,
    liked: false,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        ReviewsService,
        LikesService,
        { provide: FirebaseService, useValue: {} },
        {
          provide: getRepositoryToken(Comments),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
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
          provide: getRepositoryToken(Reviews),
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

    firebaseService = module.get<FirebaseService>(FirebaseService);
    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<Repository<Comments>>(
      getRepositoryToken(Comments),
    );
    reviewsRepository = module.get<Repository<Reviews>>(
      getRepositoryToken(Reviews),
    );
    likesService = module.get<LikesService>(LikesService);
    reviewsService = module.get<ReviewsService>(ReviewsService);
    likesReviewsRepository = module.get<Repository<LikesReviews>>(
      getRepositoryToken(LikesReviews),
    );
    likesCommentsRepository = module.get<Repository<LikesComments>>(
      getRepositoryToken(LikesComments),
    );
    likesTypeRepository = module.get<Repository<LikesType>>(
      getRepositoryToken(LikesType),
    );

    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it("should be defined", () => {
    expect(commentsService).toBeDefined();
    expect(firebaseService).toBeDefined();
    expect(commentsRepository).toBeDefined();
    expect(reviewsRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(likesService).toBeDefined();
    expect(reviewsService).toBeDefined();
    expect(likesReviewsRepository).toBeDefined();
    expect(likesCommentsRepository).toBeDefined();
    expect(likesTypeRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe("addComment", () => {
    it("댓글작성 테스트", async () => {
      const mockInsertCommentResult: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };
      jest
        .spyOn(commentsRepository, "insert")
        .mockResolvedValue(mockInsertCommentResult);

      const mockUser: Users = {
        id: 1,
        uid: "mock-uid",
        profileImage: "test_image.png",
        nickname: "test",
        created_at: new Date(),
      };
      jest.spyOn(usersRepository, "findOne").mockResolvedValue(mockUser);

      const mockReview: Reviews = {
        review_id: 1,
        user_uid: "mock-uid",
        rated: 3,
        title: "REVIEW TEST",
        contents: "Review 테스트",
        type_id: "112cd",
        created_at: new Date(),
        updated_at: new Date(),
        comments: [],
        likes: [],
      };

      jest
        .spyOn(reviewsRepository, "findOne")
        .mockResolvedValueOnce(mockReview);

      const result = await commentsService.addComment(
        mockUser.uid,
        mockReview.review_id,
        mockUserComment,
      );
      expect(result).toBe(mockInsertCommentResult);
      expect(commentsRepository.insert).toHaveBeenCalledWith({
        user_uid: mockUser.uid,
        review: mockReview,
        nickname: mockUserComment.nickname,
        contents: mockUserComment.contents,
      });
    });
  });

  describe("getAllComments", () => {
    it("리뷰 전체 댓글 조회 테스트", async () => {
      const mockAllComments: Comments[] = [
        {
          comment_id: commentId,
          user_uid: "mock-uid",
          nickname: "test",
          contents: "댓글 테스트",
          created_at: mockUserComments[0].created_at,
          updated_at: mockUserComments[0].updated_at,
          likes: [],
          review: null,
        },
      ];

      jest.spyOn(commentsRepository, "find").mockResolvedValue(mockAllComments);
      jest.spyOn(reviewsService, "findNickname").mockResolvedValue("test");
      jest.spyOn(likesService, "checkLikeReviewId").mockResolvedValue(false); // 좋아요 상태를 false로 설정

      const result = await commentsService.getAllComments(
        req.user.uid,
        reviewId,
      );
      expect(result).toEqual(mockUserComments);
    });
  });

  describe("getUserComments", () => {
    it("내가 쓴 댓글 조회 테스트", async () => {
      jest.spyOn(commentsRepository, "find").mockResolvedValue([
        {
          comment_id: 2,
          user_uid: req.user.uid,
          nickname: "test",
          contents: "댓글 테스트",
          created_at: mockUserComment.created_at,
          updated_at: mockUserComment.updated_at,
          likes: [],
          review: null, // mock 데이터를 실제 반환 형태에 맞게 수정
        },
      ]);

      jest.spyOn(likesService, "checkLikeReviewId").mockResolvedValue(false); // 좋아요 상태를 false로 설정

      jest.spyOn(reviewsService, "findNickname").mockResolvedValue("test");

      const result = await commentsService.getUserComments(req.user.uid);
      expect(
        result.map(comment => ({
          ...comment,
          created_at: comment.created_at.toISOString(),
          updated_at: comment.created_at.toISOString(),
        })),
      ).toEqual(
        mockUserComments.map(comment => ({
          ...comment,
          created_at: comment.created_at.toISOString(),
          updated_at: comment.created_at.toISOString(),
        })),
      );
      expect(commentsRepository.find).toHaveBeenCalledWith({
        where: { user_uid: req.user.uid },
        relations: ["review"],
      });
      expect(likesService.checkLikeReviewId).toHaveBeenCalled();
      expect(reviewsService.findNickname).toHaveBeenCalledWith(req.user.uid);
    });
  });

  describe("editComments", () => {
    it("댓글 수정 테스트", async () => {
      const mockEditComment: UpdateResult = {
        generatedMaps: [],
        raw: {},
        affected: 1,
      };
      const mockAllComments: Comments = {
        comment_id: commentId,
        user_uid: "mock-uid",
        nickname: "test",
        contents: "댓글 테스트",
        created_at: new Date(),
        updated_at: new Date(),
        likes: [],
        review: null,
      };

      jest
        .spyOn(commentsRepository, "findOne")
        .mockResolvedValue(mockAllComments);

      jest
        .spyOn(commentsRepository, "update")
        .mockResolvedValue(mockEditComment);

      const result = await commentsService.editComments(
        reviewId,
        commentId,
        req.user.uid,
        createCommentDTO,
      );
      expect(commentsRepository.update).toHaveBeenCalledWith(
        { comment_id: commentId, user_uid: req.user.uid },
        { contents: createCommentDTO.contents },
      );
      expect(result).toEqual(mockEditComment);
    });
  });

  describe("deleteComment", () => {
    it("댓글 삭제 테스트", async () => {
      const mockEditComment: DeleteResult = {
        raw: {},
        affected: 1,
      };
      const mockAllComments: Comments = {
        comment_id: commentId,
        user_uid: "mock-uid",
        nickname: "test",
        contents: "댓글 테스트",
        created_at: new Date(),
        updated_at: new Date(),
        likes: [],
        review: null,
      };

      jest
        .spyOn(commentsRepository, "delete")
        .mockResolvedValue(mockEditComment);

      jest
        .spyOn(commentsRepository, "findOne")
        .mockResolvedValue(mockAllComments);

      const result = await commentsService.deleteComment(
        reviewId,
        commentId,
        req.user.uid,
      );
      expect(commentsRepository.delete).toHaveBeenCalledWith({
        comment_id: commentId,
        user_uid: req.user.uid,
      });
      expect(result).toEqual(mockEditComment);
    });
  });
});
