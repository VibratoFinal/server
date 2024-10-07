import { Test, TestingModule } from "@nestjs/testing";
import { MusicsService } from "./musics.service";
import { SpotifyService } from "./spotify.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "./musics.repository";

describe("MusicsService", () => {
  let service: MusicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicsService,
        SpotifyService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<MusicsService>(MusicsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
