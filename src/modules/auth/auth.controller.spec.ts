import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./auth.controller";
import { UsersService } from "./auth.service";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { InsertResult, UpdateResult } from "typeorm";
import { Users } from "./entity/auth.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;
  let firebaseService: FirebaseService;
  beforeEach(async () => {
    const mockFirebaseService = {
      verifyToken: jest.fn().mockResolvedValue("mock-uid"),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: FirebaseService, useValue: { mockFirebaseService } },
        {
          provide: getRepositoryToken(Users),
          useValue: { joinUser: jest.fn() },
        },
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

  describe("createUser", () => {
    it("회원가입 테스트", async () => {
      const req = { user: { uid: "mock-uid" } };
      const createUserDTO = { profileImage: "test.jpg", nickname: "테스트" };
      const mockJoin: InsertResult = {
        generatedMaps: [],
        raw: {},
        identifiers: [
          {
            uid: "mock-uid",
            profileImage: createUserDTO.profileImage,
            nickname: createUserDTO.nickname,
          },
        ],
      };
      jest.spyOn(usersService, "joinUser").mockResolvedValue(mockJoin);
      const result = await controller.createUser(req, createUserDTO);
      expect(usersService.joinUser).toHaveBeenCalledWith(
        "mock-uid",
        createUserDTO,
      );
      expect(result).toBe(mockJoin);
    });
  });

  describe("getUser", () => {
    it("로그인 테스트", async () => {
      const req = { user: { uid: "mock-uid" } };
      const mockLogin: Users = {
        id: 1,
        uid: "mock-uid",
        profileImage: "test.jpg",
        nickname: "테스트",
        created_at: new Date(),
      };
      jest.spyOn(usersService, "getUser").mockResolvedValue(mockLogin);
      const result = await controller.getUser(req);
      expect(usersService.getUser).toHaveBeenCalledWith("mock-uid");
      expect(result).toBe(mockLogin);
    });
  });

  describe("editUser", () => {
    it("회원정보 수정 테스트", async () => {
      const req = { user: { uid: "mock-uid" } };
      const createUserDTO = {
        profileImage: "test1.jpg",
        nickname: "테스트 수정",
      };
      const mockEdit: UpdateResult = {
        generatedMaps: [],
        raw: {},
        affected: 1,
      };
      jest.spyOn(usersService, "editUser").mockResolvedValue(mockEdit);
      const result = await controller.editUser(req, createUserDTO);
      expect(usersService.editUser).toHaveBeenCalledWith(
        "mock-uid",
        createUserDTO,
      );
      expect(result).toBe(mockEdit);
    });
  });
});
