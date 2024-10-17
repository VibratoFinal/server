import { Test, TestingModule } from "@nestjs/testing";
import { CommentsController } from "@modules/comments/comments.controller";
import { CommentsService, CreateResponseCommentDTO } from "./comments.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { LikesService } from "../likes/likes.service";
import { ReviewsService } from "../reviews/reviews.service";

describe("CommentsController", () => {
  let controller: CommentsController;
  let commentsService: CommentsService;
  let firebaseService: FirebaseService;

  const req = { user: { uid: "mock-uid" } };
  const reviewId = 1;
  const commentId = 2;
  const createCommentDTO = { contents: "댓글작성 테스트" };

  const mockComments: CreateResponseCommentDTO[] = [
    {
      comment_id: 1,
      contents: "내가 쓴 댓글 조회 테스트",
      nickname: "test",
      user_uid: "mock-uid",
      created_at: new Date(),
      updated_at: new Date(),
      likes: [],
      liked: false,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        { provide: FirebaseService, useValue: {} },
        { provide: LikesService, useValue: {} },
        { provide: ReviewsService, useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it("should be CommentsController", () => {
    expect(controller).toBeDefined();
    expect(commentsService).toBeDefined();
    expect(firebaseService).toBeDefined();
  });

  describe("addComment", () => {
    it("댓글작성 테스트", async () => {
      const mockAddComment: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };
      jest
        .spyOn(commentsService, "addComment")
        .mockResolvedValue(mockAddComment);
      const result = await controller.addComment(
        req,
        reviewId,
        createCommentDTO,
      );
      expect(commentsService.addComment).toHaveBeenCalledWith(
        req.user.uid,
        reviewId,
        createCommentDTO,
      );
      expect(result).toBe(mockAddComment);
    });
  });

  describe("getAllComments", () => {
    it("리뷰 전체 댓글 조회 테스트", async () => {
      jest
        .spyOn(commentsService, "getAllComments")
        .mockResolvedValue(mockComments);
      const result = await controller.getAllComments(req, reviewId);

      expect(commentsService.getAllComments).toHaveBeenCalledWith(
        req.user.uid,
        reviewId,
      );
      expect(result).toEqual(mockComments);
    });
  });

  describe("getUserComments", () => {
    it("내가 쓴 댓글 조회 테스트", async () => {
      jest
        .spyOn(commentsService, "getUserComments")
        .mockResolvedValue(mockComments);

      const result = await controller.getUserComments(req);

      expect(commentsService.getUserComments).toHaveBeenCalledWith(
        req.user.uid,
      );
      expect(result).toBe(mockComments);
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
        .spyOn(commentsService, "editComments")
        .mockResolvedValue(mockEditComment);
      const result = await controller.editComments(
        reviewId,
        commentId,
        req,
        createCommentDTO,
      );
      expect(commentsService.editComments).toHaveBeenCalledWith(
        reviewId,
        commentId,
        req.user.uid,
        createCommentDTO,
      );
      expect(result).toBe(mockEditComment);
    });
  });

  describe("deleteComments", () => {
    it("댓글 삭제 테스트", async () => {
      const mockDeleteComment: DeleteResult = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(commentsService, "deleteComment")
        .mockResolvedValue(mockDeleteComment);
      const result = await controller.deleteComment(reviewId, commentId, req);
      expect(commentsService.deleteComment).toHaveBeenCalledWith(
        reviewId,
        commentId,
        req.user.uid,
      );
      expect(result).toBe(mockDeleteComment);
    });
  });
});
