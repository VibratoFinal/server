import { Test, TestingModule } from "@nestjs/testing";
import { ProfileImagesService } from "./profile-images.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/profile-images.entity";
import { Users } from "@modules/auth/entity/auth.entity";
import { Repository } from "typeorm";

describe("ProfileImagesService", () => {
  let service: ProfileImagesService;
  let profileImagesRepository: Repository<ProfileImages>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileImagesService,
        {
          provide: getRepositoryToken(ProfileImages),
          useClass: Repository, // 모의 객체로 Repository 제공
        },
        {
          provide: getRepositoryToken(Users),
          useClass: Repository, // 모의 객체로 Repository 제공
        },
      ],
    }).compile();

    service = module.get<ProfileImagesService>(ProfileImagesService);
    profileImagesRepository = module.get<Repository<ProfileImages>>(
      getRepositoryToken(ProfileImages),
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get all profile images", async () => {
    const mockImages = [
      { id: 1, profile_image_URL: "url1" },
      { id: 2, profile_image_URL: "url2" },
    ];

    jest.spyOn(profileImagesRepository, "find").mockResolvedValue(mockImages);

    const result = await service.getAllImages();
    expect(result).toEqual(mockImages);
  });

  it("should add a profile image", async () => {
    const createImageDTO = { profile_image_URL: "new-url" };
    const insertSpy = jest
      .spyOn(profileImagesRepository, "insert")
      .mockResolvedValue(undefined);

    await service.addProfileImage(createImageDTO);
    expect(insertSpy).toHaveBeenCalledWith({
      profile_image_URL: createImageDTO.profile_image_URL,
    });
  });
});
