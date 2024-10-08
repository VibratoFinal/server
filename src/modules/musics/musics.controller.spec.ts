import { Test, TestingModule } from "@nestjs/testing";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
import { SpotifyService } from "./spotify.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "./musics.repository";

describe("MusicsController", () => {
  let controller: MusicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicsController],
      providers: [
        MusicsService,
        SpotifyService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<MusicsController>(MusicsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
