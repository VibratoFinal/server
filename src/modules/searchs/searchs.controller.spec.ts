import { Test, TestingModule } from "@nestjs/testing";
import { SearchsController } from "./searchs.controller";

describe("SearchsController", () => {
  let controller: SearchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchsController],
    }).compile();

    controller = module.get<SearchsController>(SearchsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
