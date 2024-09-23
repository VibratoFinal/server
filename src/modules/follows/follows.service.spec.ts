import { Test, TestingModule } from "@nestjs/testing";
import { FollowsService } from "./follows.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../auth/entity/auth.entity";
import { Repository } from "typeorm";
import { Follows } from "./entity/follows.entity";

const MockUserRepository = () => ({
  find: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe("FollowsService", () => {
  let service: FollowsService;
  let userRepository: MockRepository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowsService,
        {
          provide: getRepositoryToken(Users),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(Follows),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FollowsService>(FollowsService);
    userRepository = module.get<MockRepository<Users>>(
      getRepositoryToken(Users),
    );
  });

  it("should add a follow", async () => {
    const mockUser = { uid: "user123", id: 1 };
    const createFollowDTO = { type_id: 123 };

    userRepository.findOne.mockResolvedValue(mockUser); // 사용자 찾기
    const insertSpy = jest.spyOn(service["followRepository"], "insert"); // 팔로우 삽입 확인

    await service.addFollow(mockUser.uid, createFollowDTO);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { uid: mockUser.uid },
    });
    expect(insertSpy).toHaveBeenCalledWith({
      user_uid: mockUser,
      type_id: createFollowDTO.type_id,
    });
  });

  it("should delete a follow", async () => {
    const mockUser = { uid: "user123", id: 1 };
    const createFollowDTO = { type_id: 123 };

    userRepository.findOne.mockResolvedValue(mockUser); // 사용자 찾기
    const deleteSpy = jest.spyOn(service["followRepository"], "delete"); // 팔로우 삭제 확인

    await service.deleteFollow(mockUser.uid, createFollowDTO);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { uid: mockUser.uid },
    });
    expect(deleteSpy).toHaveBeenCalledWith({
      user_uid: mockUser,
      type_id: createFollowDTO.type_id,
    });
  });
});
