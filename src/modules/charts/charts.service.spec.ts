import { Test, TestingModule } from "@nestjs/testing";
import { ChartsService } from "@modules/charts/charts.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigModule } from "@nestjs/config";

describe("ChartsService", () => {
  let service: ChartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ChartsService, SpotifyService],
    }).compile();

    service = module.get<ChartsService>(ChartsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
