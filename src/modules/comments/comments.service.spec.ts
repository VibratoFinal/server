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

describe("CommentsService", () => {
  let commentsService: CommentsService;
  let firebaseService: FirebaseService;
  let commentsRepository: Repository<Comments>;
  let reviewsRepository: Repository<Reviews>;
  let usersRepository: Repository<Users>;

  const req = { user: { uid: "mock-uid" } };
  const reviewId = 1;
  const commentId = 2;
  const createCommentDTO: CreateCommentDTO = { contents: "댓글 테스트" };
  const mockUserComments: CreateResponseCommentDTO = {
    comment_id: commentId,
    nickname: "test",
    contents: "댓글 테스트",
    created_at: new Date(),
    updated_at: new Date(),
    likes: [new SimpleLikesReviews("mock-uid")],
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

    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it("should be defined", () => {
    expect(commentsService).toBeDefined();
    expect(firebaseService).toBeDefined();
    expect(commentsRepository).toBeDefined();
    expect(reviewsRepository).toBeDefined();
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
        nickname: "Test User",
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
        createCommentDTO,
      );
      expect(result).toBe(mockInsertCommentResult);
      expect(commentsRepository.insert).toHaveBeenCalledWith({
        user_uid: mockUser.uid,
        review: mockReview,
        contents: createCommentDTO.contents,
      });
    });
  });

  describe("getAllComments", () => {
    it("리뷰 전체 댓글 조회 테스트", async () => {
      const mockAllComments: Comments[] = [
        {
          comment_id: 1,
          user_uid: "mock-uid",
          nickname: "nickname",
          contents: "이 글 쓴거 나임!",
          created_at: new Date(),
          updated_at: new Date(),
          likes: [],
          review: null,
        },
      ];

      jest.spyOn(commentsRepository, "find").mockResolvedValue(mockAllComments);

      const result = await commentsService.getAllComments(
        req.user.uid,
        reviewId,
      );
      expect(result).toEqual(mockAllComments);
    });
  });

  describe("getUserComments", () => {
    it("내가 쓴 댓글 조회 테스트", async () => {
      const mockUserComments: Comments[] = [
        {
          comment_id: 1,
          user_uid: req.user.uid,
          nickname: "test",
          contents: "내가 쓴 댓글 조회 테스트",
          created_at: new Date(),
          updated_at: new Date(),
          likes: [],
          review: null,
        },
      ];
      jest
        .spyOn(commentsRepository, "find")
        .mockResolvedValue(mockUserComments);

      const result = await commentsService.getUserComments(req.user.uid);
      expect(result).toEqual(mockUserComments);
    });
  });

  describe("editComments", () => {
    it("댓글 수정 테스트", async () => {
      const mockEditComment: UpdateResult = {
        generatedMaps: [],
        raw: {},
        affected: 1,
      };

      jest
        .spyOn(commentsRepository, "update")
        .mockResolvedValue(mockEditComment);

      // jest
      //   .spyOn(commentsRepository, "findOne")
      //   .mockResolvedValue(mockUserComments);

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

      jest
        .spyOn(commentsRepository, "delete")
        .mockResolvedValue(mockEditComment);

      // jest
      //   .spyOn(commentsRepository, "findOne")
      //   .mockResolvedValue(mockUserComments);

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
