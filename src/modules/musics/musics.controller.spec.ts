import { Test, TestingModule } from "@nestjs/testing";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
import { SpotifyService } from "./spotify.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "./musics.repository";
import {
  AlbumDTO,
  ArtistDTO,
  SearchAllDTO,
  TrackDTO,
} from "./dto/create-result.dto";
import { SearchDTO } from "./dto/search-spotify.dto";

describe("MusicsController", () => {
  let controller: MusicsController;
  let service: MusicsService;

  const mockMusicsService = {
    searchAll: jest.fn(),
    searchTrack: jest.fn(),
    searchArtist: jest.fn(),
    searchAlbum: jest.fn(),
  };

  const mockTrack: TrackDTO = {
    id: "track-id",
    name: "Test Track",
    artists_name: ["Test Artist"],
    spotify_url: "https://spotify.com/test-track",
    preview: "https://example.com/test-preview.mp3",
    album_id: "album-id",
    album_name: "Test Album",
    image_url: "https://example.com/test-track.jpg",
    album_spotify_url: "https://spotify.com/test-album",
    release_date: new Date("2023-01-01"),
    duration: "00:00",
    album_artists: [],
    avg_rated: 4.5,
    count_rated: 100,
    liked: true,
  };

  const mockArtist: ArtistDTO = {
    id: "artist-id",
    name: "Test Artist",
    spotify_url: "https://spotify.com/test-artist",
    image_url: "https://example.com/test-artist.jpg",
    genres: "Pop",
    avg_rated: 4.5,
    count_rated: 200,
    liked: true,
  };

  const mockAlbum: AlbumDTO = {
    id: "album-id",
    name: "Test Album",
    artists_name: ["Test Artist"],
    image_url: "https://example.com/test-album.jpg",
    total_tracks: 10,
    release_date: new Date("2023-01-01"),
    album_artists: [],
    avg_rated: 4.5,
    count_rated: 100,
    liked: true,
  };

  const mockSearchAllDTO: SearchAllDTO = {
    tracks: [mockTrack],
    artists: [mockArtist],
    albums: [mockAlbum],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicsController],
      providers: [
        {
          provide: MusicsService,
          useValue: mockMusicsService,
        },
        SpotifyService,
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<MusicsController>(MusicsController);
    service = module.get<MusicsService>(MusicsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("searchAll", () => {
    it("should return all search results", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { search_content: "test" };
      jest.spyOn(service, "searchAll").mockResolvedValue(mockSearchAllDTO);

      const result = await controller.searchAll({ user: { uid } }, body);
      expect(result).toEqual(mockSearchAllDTO);
      expect(service.searchAll).toHaveBeenCalledWith(uid, body.search_content);
    });
  });

  describe("searchTrack", () => {
    it("should return tracks", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { search_content: "test track" };
      jest.spyOn(service, "searchTrack").mockResolvedValue([mockTrack]);

      const result = await controller.searchTrack({ user: { uid } }, body);
      expect(result).toEqual([mockTrack]);
      expect(service.searchTrack).toHaveBeenCalledWith(
        uid,
        body.search_content,
      );
    });
  });

  describe("searchArtist", () => {
    it("should return artists", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { search_content: "test artist" };
      jest.spyOn(service, "searchArtist").mockResolvedValue([mockArtist]);

      const result = await controller.searchArtist({ user: { uid } }, body);
      expect(result).toEqual([mockArtist]);
      expect(service.searchArtist).toHaveBeenCalledWith(
        uid,
        body.search_content,
      );
    });
  });

  describe("searchAlbum", () => {
    it("should return albums", async () => {
      const uid = "test-uid";
      const body: SearchDTO = { search_content: "test album" };
      jest.spyOn(service, "searchAlbum").mockResolvedValue([mockAlbum]);

      const result = await controller.searchAlbum({ user: { uid } }, body);
      expect(result).toEqual([mockAlbum]);
      expect(service.searchAlbum).toHaveBeenCalledWith(
        uid,
        body.search_content,
      );
    });
  });
});
