import { Test, TestingModule } from "@nestjs/testing";
import { SearchsController } from "./searchs.controller";
import { SearchsService } from "./searchs.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigService } from "@nestjs/config";
import { SearchsRepository } from "./searchs.repository";
import { MusicsRepository } from "../musics/musics.repository";

describe("SearchsController", () => {
  let controller: SearchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchsController],
      providers: [
        SearchsService,
        SpotifyService,
        ConfigService,
        { provide: SearchsRepository, useValue: {} },
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<SearchsController>(SearchsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
