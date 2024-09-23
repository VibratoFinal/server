import { Test, TestingModule } from "@nestjs/testing";
import { FollowsService } from "./follows.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../auth/entity/auth.entity";
import { Follows } from "./entity/follows.entity";

describe("FollowsService", () => {
  let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowsService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Follows),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FollowsService>(FollowsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
