import { Test, TestingModule } from "@nestjs/testing";
import { SpotifyService } from "./spotify.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "./musics.repository";

describe("SpotifyService", () => {
  let service: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
