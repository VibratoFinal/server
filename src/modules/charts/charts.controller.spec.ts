import { Test, TestingModule } from "@nestjs/testing";
import { ChartsController } from "./charts.controller";
import { SpotifyService } from "../musics/spotify.service";
import { ChartsService } from "./charts.service";
import { ConfigService } from "@nestjs/config";
import { MusicsRepository } from "../musics/musics.repository";
import { ChartsRepository } from "./charts.repository";
import { ChartsDTO } from "./dto/create-charts.dto";
import { HttpException } from "@nestjs/common";

jest.mock("@/common/decorators/skip-auth.decorator", () => ({
  SkipAuth: () => (target: any, key: string, descriptor: PropertyDescriptor) =>
    descriptor,
}));

describe("ChartsController", () => {
  let controller: ChartsController;
  let service: ChartsService;

  const mockChartsService = {
    getGlobal50: jest.fn(),
    getKorea50: jest.fn(),
    getGlobal50Weekly: jest.fn(),
    getKorea50Weekly: jest.fn(),
    getKoreaRecent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartsController],
      providers: [
        SpotifyService,
        { provide: ChartsService, useValue: mockChartsService },
        ConfigService,
        { provide: MusicsRepository, useValue: {} },
        { provide: ChartsRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<ChartsController>(ChartsController);
    service = module.get<ChartsService>(ChartsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("globalTop50", () => {
    it("should return top 50 global charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };
      const mockResponse: ChartsDTO[] = [
        {
          id: "1",
          name: "Test Song",
          artists_name: [],
          spotify_url: "",
          preview: "",
          album_id: "",
          album_name: "",
          image_url: "",
          album_spotify_url: "",
          release_date: new Date(),
          album_artists: [],
          avg_rated: 0,
          count_rated: 0,
          liked: false,
        },
      ];
      jest.spyOn(service, "getGlobal50").mockResolvedValue(mockResponse);

      const result = await controller.globalTop50(
        {
          user: { uid: mockUid },
        },
        mockBody,
      );

      expect(result).toEqual(mockResponse);
      expect(service.getGlobal50).toHaveBeenCalledWith(mockUid, mockBody);
    });

    it("should handle errors when fetching top 50 global charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };

      jest
        .spyOn(service, "getGlobal50")
        .mockRejectedValue(new HttpException("Failed to get global 50", 500));

      await expect(
        controller.globalTop50({ user: { uid: mockUid } }, mockBody),
      ).rejects.toThrow(HttpException);
    });
  });

  describe("koreaTop50", () => {
    it("should return top 50 Korea charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };
      const mockResponse: ChartsDTO[] = [
        {
          id: "1",
          name: "Test Song",
          artists_name: [],
          spotify_url: "",
          preview: "",
          album_id: "",
          album_name: "",
          image_url: "",
          album_spotify_url: "",
          release_date: new Date(),
          album_artists: [],
          avg_rated: 0,
          count_rated: 0,
          liked: false,
        },
      ];
      jest.spyOn(service, "getKorea50").mockResolvedValue(mockResponse);

      const result = await controller.koreaTop50(
        { user: { uid: mockUid } },
        mockBody,
      );

      expect(result).toEqual(mockResponse);
      expect(service.getKorea50).toHaveBeenCalledWith(mockUid, mockBody);
    });

    it("should handle errors when fetching top 50 Korea charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };

      jest
        .spyOn(service, "getKorea50")
        .mockRejectedValue(new HttpException("Failed to get korea 50", 500));

      await expect(
        controller.koreaTop50({ user: { uid: mockUid } }, mockBody),
      ).rejects.toThrow(HttpException);
    });
  });

  describe("globalTop50Weekly", () => {
    it("should return top 50 global weekly charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };
      const mockResponse: ChartsDTO[] = [
        {
          id: "1",
          name: "Test Song",
          artists_name: [],
          spotify_url: "",
          preview: "",
          album_id: "",
          album_name: "",
          image_url: "",
          album_spotify_url: "",
          release_date: new Date(),
          album_artists: [],
          avg_rated: 0,
          count_rated: 0,
          liked: false,
        },
      ];
      jest.spyOn(service, "getGlobal50Weekly").mockResolvedValue(mockResponse);

      const result = await controller.globalTop50Weekly(
        { user: { uid: mockUid } },
        mockBody,
      );

      expect(result).toEqual(mockResponse);
      expect(service.getGlobal50Weekly).toHaveBeenCalledWith(mockUid, mockBody);
    });

    it("should handle errors when fetching top 50 global weekly charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };

      jest
        .spyOn(service, "getGlobal50Weekly")
        .mockRejectedValue(
          new HttpException("Failed to get top 50 global weekly chart", 500),
        );

      await expect(
        controller.globalTop50Weekly({ user: { uid: mockUid } }, mockBody),
      ).rejects.toThrow(HttpException);
    });
  });

  describe("getKorea50Weekly", () => {
    it("should return top 50 Korea weekly charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };
      const mockResponse: ChartsDTO[] = [
        {
          id: "1",
          name: "Test Song",
          artists_name: [],
          spotify_url: "",
          preview: "",
          album_id: "",
          album_name: "",
          image_url: "",
          album_spotify_url: "",
          release_date: new Date(),
          album_artists: [],
          avg_rated: 0,
          count_rated: 0,
          liked: false,
        },
      ];
      jest.spyOn(service, "getKorea50Weekly").mockResolvedValue(mockResponse);

      const result = await controller.koreaTop50Weekly(
        { user: { uid: mockUid } },
        mockBody,
      );

      expect(result).toEqual(mockResponse);
      expect(service.getKorea50Weekly).toHaveBeenCalledWith(mockUid, mockBody);
    });

    it("should handle errors when fetching top 50 Korea weekly charts", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };

      jest
        .spyOn(service, "getKorea50Weekly")
        .mockRejectedValue(
          new HttpException("Failed to get top 50 Korea weekly chart", 500),
        );

      await expect(
        controller.koreaTop50Weekly({ user: { uid: mockUid } }, mockBody),
      ).rejects.toThrow(HttpException);
    });
  });

  describe("getKoreaRecent", () => {
    it("should return Korea Recent Songs", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };
      const mockResponse: ChartsDTO[] = [
        {
          id: "1",
          name: "Test Song",
          artists_name: [],
          spotify_url: "",
          preview: "",
          album_id: "",
          album_name: "",
          image_url: "",
          album_spotify_url: "",
          release_date: new Date(),
          album_artists: [],
          avg_rated: 0,
          count_rated: 0,
          liked: false,
        },
      ];
      jest.spyOn(service, "getKoreaRecent").mockResolvedValue(mockResponse);

      const result = await controller.koreaRecent(
        { user: { uid: mockUid } },
        mockBody,
      );

      expect(result).toEqual(mockResponse);
      expect(service.getKoreaRecent).toHaveBeenCalledWith(mockUid, mockBody);
    });

    it("should handle errors when fetching Korea Recent Songs", async () => {
      const mockUid = "test-uid";
      const mockBody = { limit: "1", offset: "0" };

      jest
        .spyOn(service, "getKoreaRecent")
        .mockRejectedValue(
          new HttpException("Failed to get Korea Recent Songs", 500),
        );

      await expect(
        controller.koreaRecent({ user: { uid: mockUid } }, mockBody),
      ).rejects.toThrow(HttpException);
    });
  });
});
