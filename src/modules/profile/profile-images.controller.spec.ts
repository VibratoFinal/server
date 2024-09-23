import { Test, TestingModule } from "@nestjs/testing";
import { ImagesController } from "./profile-images.controller";
import { ProfileImagesService } from "./profile-images.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProfileImages } from "./entity/profile-images.entity";

describe("ImagesController", () => {
  let controller: ImagesController;
  let service: ProfileImagesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        ProfileImagesService,
        { provide: getRepositoryToken(ProfileImages), useValue: {} },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ProfileImagesService>(ProfileImagesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
