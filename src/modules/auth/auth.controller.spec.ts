import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./auth.controller";
import { UsersService } from "./auth.service";
import { FirebaseService } from "@/configs/firebase/firebase.service";
// import { InsertResult, UpdateResult } from "typeorm";
import { Users } from "./entity/auth.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProfileImages } from "../profile/entity/profile-images.entity";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;
  let firebaseService: FirebaseService;
  beforeEach(async () => {
    const mockFirebaseService = {
      verifyToken: jest.fn().mockResolvedValue("exampleUID"),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: FirebaseService, useValue: { mockFirebaseService } },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(ProfileImages), useValue: {} },
      ],
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

  // describe("createUser", () => {
  //   it("회원가입 테스트", async () => {
  //     const authHeader = "Bearer exampleUID";
  //     const createUserDTO = { profileImageId: 1, nickname: "테스트" };
  //     const mockJoin: InsertResult = {
  //       generatedMaps: [],
  //       raw: {},
  //       identifiers: [
  //         { uid: "exampleUID", profileImage: 1, nickname: "테스트" },
  //       ],
  //     };
  //     jest.spyOn(usersService, "joinUser").mockResolvedValue(mockJoin);
  //     const result = await controller.createUser(authHeader, createUserDTO);
  //     expect(usersService.joinUser).toHaveBeenCalledWith(
  //       "exampleUID",
  //       createUserDTO,
  //     );
  //     expect(result).toBe(mockJoin);
  //   });
  // });

  // describe("getUser", () => {
  //   it("로그인 테스트", async () => {
  //     const authHeader = "Bearer exampleUID";
  //     const mockLogin: Users = {
  //       id: 1,
  //       uid: "exampleUID",
  //       profileImage: null,
  //       nickname: "테스트",
  //       created_at: new Date(),
  //     };
  //     jest.spyOn(usersService, "getUser").mockResolvedValue(mockLogin);
  //     const result = await controller.getUser(authHeader);
  //     expect(usersService.getUser).toHaveBeenCalledWith("exampleUID");
  //     expect(result).toBe(mockLogin);
  //   });
  // });

  // describe("editUser", () => {
  //   it("회원정보 수정 테스트", async () => {
  //     const authHeader = "Bearer exampleUID";
  //     const createUserDTO = { profileImageId: 2, nickname: "테스트 수정" };
  //     const mockEdit: UpdateResult = {
  //       generatedMaps: [],
  //       raw: {},
  //       affected: 1,
  //     };
  //     jest.spyOn(usersService, "editUser").mockResolvedValue(mockEdit);
  //     const result = await controller.editUser(authHeader, createUserDTO);
  //     expect(usersService.editUser).toHaveBeenCalledWith(
  //       "exampleUID",
  //       createUserDTO,
  //     );
  //     expect(result).toBe(mockEdit);
  //   });
  // });
});
