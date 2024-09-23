import { Test, TestingModule } from "@nestjs/testing";
import { SearchsService } from "./searchs.service";

describe("SearchsService", () => {
  let service: SearchsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchsService],
    }).compile();

    service = module.get<SearchsService>(SearchsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
