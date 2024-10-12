import { Test, TestingModule } from "@nestjs/testing";
import { CommentsController } from "@modules/comments/comments.controller";
import { CommentsService } from "./comments.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";

describe("CommentsController", () => {
  let controller: CommentsController;
  let service: CommentsService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it("should be CommentsController", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
