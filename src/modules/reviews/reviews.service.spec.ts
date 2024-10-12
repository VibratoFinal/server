import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsService } from "./reviews.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { Comments } from "../comments/entity/comments.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Users } from "../auth/entity/auth.entity";

describe("ReivewsService", () => {
  let service: ReviewsService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
