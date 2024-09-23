import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./auth.controller";
import { UsersService } from "./auth.service";
import { FirebaseService } from "@/configs/firebase/firebase.service";
describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;
  let firebaseService: FirebaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, FirebaseService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it("should be AuthController", () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
    expect(firebaseService).toBeDefined();
  });
});
