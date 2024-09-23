import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";

describe("ReivewsController", () => {
  let controller: ReviewsController;
  let service: ReviewsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
