import { Test, TestingModule } from "@nestjs/testing";
import { CommentsService } from "@modules/comments/comments.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comments } from "./entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { ReviewsService } from "../reviews/reviews.service";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";

describe("CommentsService", () => {
  let service: CommentsService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        ReviewsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    service = module.get<CommentsService>(CommentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
