import { Test, TestingModule } from "@nestjs/testing";
import { SearchsController } from "./searchs.controller";
import { SearchsService } from "./searchs.service";
import { SpotifyService } from "../musics/spotify.service";
import { ConfigService } from "@nestjs/config";
import { SearchsRepository } from "./searchs.repository";
import { MusicsRepository } from "../musics/musics.repository";
import { SearchDTO } from "./dto/search-single.dto";
import {
  AlbumDTO,
  ArtistDTO,
  forOthersDTO,
  TrackDTO,
} from "./dto/create-search.dto";

describe("SearchsController", () => {
  let controller: SearchsController;
  let service: SearchsService;

  const mockSearchsService = {
    getTrack: jest.fn(),
    getAlbum: jest.fn(),
    getArtist: jest.fn(),
  };

  const mockForOthersDTO: forOthersDTO = {
    id: "artist-id",
    name: "Test Artist",
    spotify_url: "https://spotify.com/test-artist",
    avg_rated: 4.5,
    liked: true,
    track_number: 1,
  };

  const mockTrack: TrackDTO = {
    name: "Test Track",
    image_url: "https://example.com/test-track.jpg",
    artist_names: ["Test Artist"],
    release_date: new Date("2023-01-01"),
    preview_url: "https://example.com/test-track-preview.mp3",
    spotify_url: "https://spotify.com/test-track",
    track_number: 1,
    duration: "00:00",
    avg_rated: 4.5,
    count_rated: 100,
    liked: true,
    album: {
      id: "album-id",
      name: "Test Album",
      spotify_url: "https://spotify.com/test-album",
      avg_rated: 4.5,
      liked: true,
      track_number: 1,
    },
    artists: [
      {
        id: "artist-id",
        name: "Test Artist",
        spotify_url: "https://spotify.com/test-artist",
        avg_rated: 4.5,
        liked: true,
      },
    ],
  };

  const mockAlbum: AlbumDTO = {
    name: "Test Album",
    image_url: "https://example.com/test-album.jpg",
    artist_names: ["Test Artist"],
    genres: ["Pop"],
    release_date: new Date("2023-01-01"),
    total_tracks: 10,
    spotify_url: "https://spotify.com/test-album",
    avg_rated: 4.5,
    count_rated: 100,
    liked: true,
    tracks: [mockForOthersDTO],
    artists: [
      {
        id: "artist-id",
        name: "Test Artist",
        spotify_url: "https://spotify.com/test-artist",
        avg_rated: 4.5,
        liked: true,
      },
    ],
  };

  const mockArtist: ArtistDTO = {
    name: "Test Artist",
    image_url: "https://example.com/test-artist.jpg",
    genres: ["Pop", "Rock"],
    spotify_url: "https://spotify.com/test-artist",
    avg_rated: 4.5,
    count_rated: 200,
    liked: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchsController],
      providers: [
        {
          provide: SearchsService,
          useValue: mockSearchsService,
        },
        SpotifyService,
        ConfigService,
        { provide: SearchsRepository, useValue: {} },
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<SearchsController>(SearchsController);
    service = module.get<SearchsService>(SearchsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTrack", () => {
    it("should return a track", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { type_id: "track-id" };
      const expectedTrack: TrackDTO = mockTrack;

      jest.spyOn(service, "getTrack").mockResolvedValue(expectedTrack);

      const result = await controller.getTrack({ user: { uid } }, body);
      expect(result).toEqual(expectedTrack);
      expect(service.getTrack).toHaveBeenCalledWith(uid, body.type_id);
    });
  });

  describe("getAlbum", () => {
    it("should return an album", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { type_id: "album-id" };
      const expectedAlbum: AlbumDTO = mockAlbum;

      jest.spyOn(service, "getAlbum").mockResolvedValue(expectedAlbum);

      const result = await controller.getAlbum({ user: { uid } }, body);
      expect(result).toEqual(expectedAlbum);
      expect(service.getAlbum).toHaveBeenCalledWith(uid, body.type_id);
    });
  });

  describe("getArtist", () => {
    it("should return an artist", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { type_id: "artist-id" };
      const expectedArtist: ArtistDTO = mockArtist;

      jest.spyOn(service, "getArtist").mockResolvedValue(expectedArtist);

      const result = await controller.getArtist({ user: { uid } }, body);
      expect(result).toEqual(expectedArtist);
      expect(service.getArtist).toHaveBeenCalledWith(uid, body.type_id);
    });
  });
});
