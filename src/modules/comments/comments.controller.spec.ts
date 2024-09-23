import { Test, TestingModule } from "@nestjs/testing";
import { CommentsController } from "@modules/comments/comments.controller";
import { CommentsService } from "./comments.service";

describe("CommentsController", () => {
  let controller: CommentsController;
  let service: CommentsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it("should be CommentsController", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
