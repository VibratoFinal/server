import { Test, TestingModule } from "@nestjs/testing";
import { ReivewsController } from "./reviews.controller";

describe("ReivewsController", () => {
  let controller: ReivewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReivewsController],
    }).compile();

    controller = module.get<ReivewsController>(ReivewsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
