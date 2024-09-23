import { Test, TestingModule } from "@nestjs/testing";
import { SpotifyService } from "./spotify.service";
import { ConfigModule } from "@nestjs/config";

describe("SpotifyService", () => {
  let service: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [SpotifyService],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
