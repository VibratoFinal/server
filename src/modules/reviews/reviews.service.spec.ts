import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsService } from "./reviews.service";

describe("ReivewsService", () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
