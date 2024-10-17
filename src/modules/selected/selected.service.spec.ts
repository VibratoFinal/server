import { Test, TestingModule } from "@nestjs/testing";
import { SelectedService } from "./selected.service";
import { LikesReviews } from "../likes/entity/likesReview.entity";
import { LikesComments } from "../likes/entity/likesComment.entity";
import { LikesType } from "../likes/entity/likesType.entity";
import { Users } from "../auth/entity/auth.entity";
import { Comments } from "../comments/entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { SpotifyService } from "../musics/spotify.service";
import { SearchsRepository } from "../searchs/searchs.repository";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "../musics/musics.repository";

describe("SelectedService", () => {
  let service: SelectedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SelectedService,
        SpotifyService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
        { provide: SearchsRepository, useValue: {} },
        { provide: FirebaseService, useValue: {} },
        { provide: getRepositoryToken(LikesReviews), useValue: {} },
        { provide: getRepositoryToken(LikesComments), useValue: {} },
        { provide: getRepositoryToken(LikesType), useValue: {} },
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: getRepositoryToken(Comments), useValue: {} },
        { provide: getRepositoryToken(Reviews), useValue: {} },
      ],
    }).compile();

    service = module.get<SelectedService>(SelectedService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
