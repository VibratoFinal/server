import { Test, TestingModule } from "@nestjs/testing";
import { FollowsController } from "@modules/follows/follows.controller";
import { FollowsService } from "./follows.service";

describe("FollowsController", () => {
  let controller: FollowsController;
  let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [FollowsService],
    }).compile();

    controller = module.get<FollowsController>(FollowsController);
    service = module.get<FollowsService>(FollowsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
