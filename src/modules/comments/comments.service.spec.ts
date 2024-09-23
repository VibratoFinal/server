import { Test, TestingModule } from "@nestjs/testing";
import { CommentsService } from "@modules/comments/comments.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";

describe("CommentsService", () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comments),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Reviews),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
