import { Test, TestingModule } from "@nestjs/testing";
import { LikesService } from "@modules/likes/likes.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LikesReviews } from "./entity/likesReview.entity";
import { LikesComments } from "./entity/likesComment.entity";
import { Users } from "../auth/entity/auth.entity";

describe("LikesService", () => {
  let service: LikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<LikesService>(LikesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
