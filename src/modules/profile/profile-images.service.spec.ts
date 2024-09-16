import { Test, TestingModule } from "@nestjs/testing";
import { ProfileImagesService } from "./profile-images.service";

describe("ImagesService", () => {
  let service: ProfileImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileImagesService],
    }).compile();

    service = module.get<ProfileImagesService>(ProfileImagesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
