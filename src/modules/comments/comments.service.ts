import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateCommentDTO } from "./dto/create-comments.dto";
import { Reviews } from "@modules/reviews/entity/reviews.entity";
import { Users } from "../auth/entity/auth.entity";
import { LikesService } from "../likes/likes.service";
import { ReviewsService, SimpleLikesReviews } from "../reviews/reviews.service";

// 코멘트 작성 add
// 수정 edit
// 전체조회 getAll
// 내가 쓴 댓글 조회 get // UID 필요
// 삭제 delete

export class CreateResponseCommentDTO {
  comment_id: number;
  user_uid: string;
  nickname: string;
  contents: string;
  created_at: Date;
  updated_at: Date;
  likes: SimpleLikesReviews[];
  liked: boolean;
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,

    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private readonly likesService: LikesService,
    private readonly reviewsService: ReviewsService,
  ) {}
  public async findUserByUid(uid: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { uid } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // 댓글 작성
  async addComment(
    uid: string,
    reviewId: number,
    createCommentDTO: CreateCommentDTO,
  ): Promise<InsertResult> {
    const { contents } = createCommentDTO;
    const user = await this.findUserByUid(uid);
    const review = await this.reviewRepository.findOne({
      where: { review_id: reviewId },
    });

    if (!review) {
      throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
    }

    return await this.commentRepository.insert({
      user_uid: user.uid,
      nickname: user.nickname,
      review: review,
      contents,
    });
  }

  // 해당 리뷰 댓글 전체 조회
  async getAllComments(
    uid: string,
    reviewId: number,
  ): Promise<CreateResponseCommentDTO[]> {
    const allComments = await this.commentRepository.find({
      where: { review: { review_id: reviewId } },
      relations: ["review"],
    });

    if (!allComments.length) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }

    const commentsWithLikes = await Promise.all(
      allComments.map(async comment => {
        const liked =
          uid && comment.review
            ? await this.likesService.checkLikeReviewId(uid, {
                review_id: comment.review.review_id,
              })
            : false;
        const nickname = await this.reviewsService.findNickname(uid);
        console.log("Check Like Inputs: ", {
          review_id: comment.review?.review_id || "No review available",
        });

        return {
          comment_id: comment.comment_id,
          nickname,
          user_uid: comment.user_uid,
          contents: comment.contents,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          likes: comment.likes.map(like => ({
            id: like.id,
            user_uid: like.user.uid,
          })),
          liked,
        };
      }),
    );

    return commentsWithLikes;
  }
  async getComments(
    uid: string,
    reviewId: number,
    commentId: number,
  ): Promise<CreateResponseCommentDTO> {
    const comment = await this.commentRepository.findOne({
      where: { review: { review_id: reviewId }, comment_id: commentId },
    });
    console.log("특정 댓글 조회", uid, commentId, reviewId);

    if (!comment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }
    const liked = uid
      ? await this.likesService.checkLikeCommentId(uid, {
          review_id: reviewId,
          comment_id: commentId,
        })
      : false;

    return {
      comment_id: comment.comment_id,
      nickname: comment.nickname,
      user_uid: comment.user_uid,
      contents: comment.contents,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      likes: comment.likes.map(like => ({
        id: like.id,
        user_uid: like.user.uid,
      })),
      liked,
    };
  }

  // 내가 쓴 댓글 조회
  async getUserComments(uid: string): Promise<CreateResponseCommentDTO[]> {
    const getUid = await this.commentRepository.find({
      where: { user_uid: uid },
      relations: ["review"],
    });

    if (!getUid.length) {
      throw new HttpException("User Comment not found", HttpStatus.NOT_FOUND);
    }

    const commentsWithLikes = await Promise.all(
      getUid.map(async comment => {
        const liked = uid
          ? await this.likesService.checkLikeReviewId(uid, {
              review_id: comment.review?.review_id,
            })
          : false;
        const nickname = await this.reviewsService.findNickname(uid);

        return {
          comment_id: comment.comment_id,
          nickname,
          user_uid: comment.user_uid,
          contents: comment.contents,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          likes: comment.likes.map(like => ({
            id: like.id,
            user_uid: like.user.uid,
          })),
          liked,
        };
      }),
    );

    return commentsWithLikes;
  }

  // 댓글 수정
  async editComments(
    reviewId: number,
    commentId: number,
    uid: string,
    createCommentDTO: CreateCommentDTO,
  ): Promise<UpdateResult> {
    const { contents } = createCommentDTO;
    await this.findComment(reviewId, commentId, uid);

    const updateResult = await this.commentRepository.update(
      { comment_id: commentId, user_uid: uid },
      { contents },
    );
    if (updateResult.affected === 0) {
      throw new HttpException(
        "Comment not found or not Unauthorized",
        HttpStatus.NOT_FOUND,
      );
    }

    return updateResult;
  }

  // 댓글 삭제
  async deleteComment(
    reviewId: number,
    commentId: number,
    uid: string,
  ): Promise<DeleteResult> {
    await this.findComment(reviewId, commentId, uid);

    const deleteResult = await this.commentRepository.delete({
      comment_id: commentId,
      user_uid: uid,
    });
    if (deleteResult.affected === 0) {
      throw new HttpException(
        "Comment not found or not Unauthorized",
        HttpStatus.NOT_FOUND,
      );
    }

    return deleteResult;
  }

  private async findComment(
    reviewId: number,
    commentId: number,
    uid: string,
  ): Promise<Comments> {
    const findComment = await this.commentRepository.findOne({
      where: {
        review: { review_id: reviewId },
        comment_id: commentId,
      },
    });

    if (!findComment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND);
    }

    if (findComment.user_uid !== uid) {
      throw new HttpException(
        "Forbidden: You do not have permission to access this comment",
        HttpStatus.FORBIDDEN,
      );
    }

    return findComment;
  }
}
