import { Test, TestingModule } from "@nestjs/testing";
import { SearchsController } from "./searchs.controller";
import { SearchsService } from "./searchs.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigModule } from "@nestjs/config";

describe("SearchsController", () => {
  let controller: SearchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SearchsController],
      providers: [SearchsService, SpotifyService],
    }).compile();

    controller = module.get<SearchsController>(SearchsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
