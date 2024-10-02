import { Test, TestingModule } from "@nestjs/testing";
import { FollowsService } from "./follows.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../auth/entity/auth.entity";
import { Follows } from "./entity/follows.entity";
import { FirebaseService } from "@/configs/firebase/firebase.service";

describe("FollowsService", () => {
  let service: FollowsService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(Follows), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    service = module.get<FollowsService>(FollowsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
