import { Test, TestingModule } from "@nestjs/testing";
import { SearchsService } from "./searchs.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigService } from "@nestjs/config";

describe("SearchsService", () => {
  let service: SearchsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchsService, SpotifyService, ConfigService],
    }).compile();

    service = module.get<SearchsService>(SearchsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
