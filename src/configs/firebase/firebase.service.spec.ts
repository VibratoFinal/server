import { Test, TestingModule } from "@nestjs/testing";
import { FirebaseService } from "./firebase.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

jest.mock("firebase-admin"); // Firebase-admin 모듈을 모의처리

describe("FirebaseService", () => {
  let service: FirebaseService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case "FIREBASE_PROJECT_ID":
          return "test-project-id";
        case "FIREBASE_PRIVATE_KEY":
          return "test-private-key";
        case "FIREBASE_CLIENT_EMAIL":
          return "test-client-email@test.com";
        default:
          return null;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FirebaseService,
        { provide: ConfigService, useValue: mockConfigService }, // ConfigService 모의 객체 사용
      ],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should initialize Firebase app if not already initialized", () => {
    expect(admin.initializeApp).toHaveBeenCalledWith(
      {
        credential: expect.any(Object),
      },
      "vibrato",
    );
  });

  it("should verify token", async () => {
    const mockToken = "mock-token";
    const mockDecodedToken = { uid: "mock-uid" };

    (admin.auth().verifyIdToken as jest.Mock).mockResolvedValueOnce(
      mockDecodedToken,
    );

    const result = await service.verifyToken(mockToken);
    expect(result).toBe(mockDecodedToken.uid);
  });

  it("should throw error on invalid token", async () => {
    const mockToken = "invalid-token";

    (admin.auth().verifyIdToken as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid token"),
    );

    await expect(service.verifyToken(mockToken)).rejects.toThrow(
      "Error: Invalid token Invalid token",
    );
  });
});
