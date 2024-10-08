import { Test, TestingModule } from "@nestjs/testing";
import { ChartsController } from "./charts.controller";
import { SpotifyService } from "../musics/spotify.service";
import { ChartsService } from "./charts.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "../musics/musics.repository";
import { ChartsRepository } from "./charts.repository";

jest.mock("@/common/decorators/skip-auth.decorator", () => ({
  SkipAuth: () => (target: any, key: string, descriptor: PropertyDescriptor) =>
    descriptor,
}));

describe("ChartsController", () => {
  let controller: ChartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartsController],
      providers: [
        SpotifyService,
        ChartsService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
        { provide: ChartsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<ChartsController>(ChartsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
