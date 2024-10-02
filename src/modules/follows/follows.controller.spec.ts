import { Test, TestingModule } from "@nestjs/testing";
import { FollowsController } from "@modules/follows/follows.controller";
import { FollowsService } from "./follows.service";
import { Follows } from "./entity/follows.entity";
import { Users } from "../auth/entity/auth.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FirebaseService } from "@/configs/firebase/firebase.service";

describe("FollowsController", () => {
  let controller: FollowsController;
  let service: FollowsService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [
        FollowsService,
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(Follows), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
      ],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
    controller = module.get<FollowsController>(FollowsController);
    service = module.get<FollowsService>(FollowsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
