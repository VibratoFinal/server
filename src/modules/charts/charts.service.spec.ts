import { Test, TestingModule } from "@nestjs/testing";
import { ChartsService } from "@modules/charts/charts.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigService } from "@nestjs/config";
import { ChartsRepository } from "./charts.repository";
import { MusicsRepository } from "../musics/musics.repository";

describe("ChartsService", () => {
  let service: ChartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChartsService,
        SpotifyService,
        ConfigService,
        { provide: ChartsRepository, useValue: {} },
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<ChartsService>(ChartsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
