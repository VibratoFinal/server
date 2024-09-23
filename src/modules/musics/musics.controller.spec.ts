import { Test, TestingModule } from "@nestjs/testing";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
import { SpotifyService } from "./spotify.service";
import { ConfigModule } from "@nestjs/config";

describe("MusicsController", () => {
  let controller: MusicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [MusicsController],
      providers: [MusicsService, SpotifyService],
    }).compile();

    controller = module.get<MusicsController>(MusicsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
