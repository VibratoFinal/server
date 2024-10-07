import { Test, TestingModule } from "@nestjs/testing";
import { SearchsService } from "./searchs.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigService } from "@nestjs/config";
import { SearchsRepository } from "./searchs.repository";
import { MusicsRepository } from "../musics/musics.repository";

describe("SearchsService", () => {
  let service: SearchsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchsService,
        SpotifyService,
        ConfigService,
        { provide: SearchsRepository, useValue: {} },
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<SearchsService>(SearchsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
