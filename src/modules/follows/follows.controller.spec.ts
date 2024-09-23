import { Test, TestingModule } from "@nestjs/testing";
import { FollowsController } from "@modules/follows/follows.controller";
import { FollowsService } from "./follows.service";
import { Follows } from "./entity/follows.entity";
import { Users } from "../auth/entity/auth.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("FollowsController", () => {
  let controller: FollowsController;
  let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [
        FollowsService,
        { provide: getRepositoryToken(Follows), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    controller = module.get<FollowsController>(FollowsController);
    service = module.get<FollowsService>(FollowsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
