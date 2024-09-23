import { Test, TestingModule } from "@nestjs/testing";
import { ChartsController } from "./charts.controller";
import { SpotifyService } from "../musics/spotify.service";
import { ChartsService } from "./charts.service";
import { ConfigModule } from "@nestjs/config";

describe("ChartsController", () => {
  let controller: ChartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ChartsController],
      providers: [SpotifyService, ChartsService],
    }).compile();

    controller = module.get<ChartsController>(ChartsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
