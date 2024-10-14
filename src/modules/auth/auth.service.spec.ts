import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "@modules/auth/auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "./entity/auth.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it("should be Auth", () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe("getUser", () => {
    it("로그인 테스트", async () => {
      const mockUser = {
        id: 1,
        uid: "test_uid",
        profileImage: "test_image.png",
        nickname: "test_nickname",
        created_at: new Date(),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValue(mockUser);

      const result = await service.getUser("test_uid");
      expect(result).toEqual({
        profileImage: "test_image.png",
        nickname: "test_nickname",
      });
    });
  });
  describe("joinUser", () => {
    it("회원가입 테스트", async () => {
      const mockInsertResult: InsertResult = {
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: [],
      };

      jest.spyOn(userRepository, "insert").mockResolvedValue(mockInsertResult);

      const mockUser = {
        uid: "test_uid",
        profileImage: "test_image.png",
        nickname: "test_nickname",
      };

      const result = await service.joinUser(mockUser.uid, mockUser);

      expect(result).toBe(mockInsertResult);
      expect(userRepository.insert).toHaveBeenCalledWith({
        uid: mockUser.uid,
        profileImage: mockUser.profileImage,
        nickname: mockUser.nickname,
      });
    });
  });

  describe("editUser", () => {
    it("회원정보 수정 테스트", async () => {
      const mockUpdateResult: UpdateResult = {
        raw: [],
        generatedMaps: [],
        affected: 1,
      };
      jest.spyOn(userRepository, "update").mockResolvedValue(mockUpdateResult);

      const mockUser = {
        uid: "test_uid",
        profileImage: "test_image.png",
        nickname: "test",
      };

      const result = await service.editUser(mockUser.uid, mockUser);

      expect(result).toEqual(mockUpdateResult);
      expect(userRepository.update).toHaveBeenCalledWith(
        { uid: mockUser.uid },
        { profileImage: mockUser.profileImage, nickname: mockUser.nickname },
      );
    });
  });
});
