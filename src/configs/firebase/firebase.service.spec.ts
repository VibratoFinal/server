import { Test, TestingModule } from "@nestjs/testing";
import { FirebaseService } from "./firebase.service";
import * as admin from "firebase-admin";
import { ConfigService } from "@nestjs/config";

describe("FirebaseService", () => {
  let service: FirebaseService;

  beforeAll(async () => {
    // Firebase Admin SDK 초기화
    admin.initializeApp({
      credential: admin.credential.applicationDefault(), // 또는 다른 자격 증명 방법
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService, ConfigService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
