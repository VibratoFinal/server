import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";

describe("ReviewsController", () => {
  let controller: ReviewsController;
  let service: ReviewsService;
  let firebaseService: FirebaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
      ],
      exports: [ReviewsService],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
