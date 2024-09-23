import { Test, TestingModule } from "@nestjs/testing";
import { SongsDetailService } from "./songsdetail.service";
import { ConfigModule } from "@nestjs/config";

describe("SongsDetailService", () => {
  let service: SongsDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [SongsDetailService],
    }).compile();

    service = module.get<SongsDetailService>(SongsDetailService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
