import { Test, TestingModule } from "@nestjs/testing";
import { ImagesController } from "./profile-images.controller";
import { ProfileImagesService } from "./profile-images.service";

describe("ImagesController", () => {
  let controller: ImagesController;
  let service: ProfileImagesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ProfileImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ProfileImagesService>(ProfileImagesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
