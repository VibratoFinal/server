import { Test, TestingModule } from "@nestjs/testing";
import { LikesService } from "@modules/likes/likes.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "../auth/entity/auth.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Reviews } from "../reviews/entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { LikesType } from "./entity/likesType.entity";

describe("LikesService", () => {
  let service: LikesService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(LikesReviews), useValue: {} },
        { provide: getRepositoryToken(LikesComments), useValue: {} },
        { provide: getRepositoryToken(LikesType), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    service = module.get<LikesService>(LikesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
