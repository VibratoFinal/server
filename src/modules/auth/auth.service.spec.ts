import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "@modules/auth/auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "./entity/auth.entity";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be Auth", () => {
    expect(service).toBeDefined();
  });
});
