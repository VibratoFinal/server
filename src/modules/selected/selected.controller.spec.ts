import { Test, TestingModule } from "@nestjs/testing";
import { SelectedController } from "./selected.controller";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LikesReviews } from "../likes/entity/likesReview.entity";
import { LikesComments } from "../likes/entity/likesComment.entity";
import { LikesType } from "../likes/entity/likesType.entity";
import { Users } from "../auth/entity/auth.entity";
import { Comments } from "../comments/entity/comments.entity";
import { Reviews } from "../reviews/entity/reviews.entity";
import { SelectedService } from "./selected.service";
import { SpotifyService } from "../musics/spotify.service";
import { SearchsRepository } from "../searchs/searchs.repository";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "../musics/musics.repository";

describe("SelectedController", () => {
  let controller: SelectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedController],
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

    controller = module.get<SelectedController>(SelectedController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
