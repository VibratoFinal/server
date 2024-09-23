import { Test, TestingModule } from "@nestjs/testing";
import { FirebaseService } from "./firebase.service";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

jest.mock("firebase-admin", () => {
  const actualAdmin = jest.requireActual("firebase-admin");
  return {
    ...actualAdmin,
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
    apps: [], // 빈 배열로 설정
  };
});

describe("FirebaseService", () => {
  let service: FirebaseService;

  beforeEach(async () => {
    // admin.apps를 모의(mock)하여 빈 배열로 설정
    Object.defineProperty(admin, "apps", {
      value: [],
      writable: true,
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(key => {
              const config = {
                FIREBASE_PROJECT_ID: "vibrato-c28f3",
                FIREBASE_PRIVATE_KEY:
                  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDCwmjTQ91kP3/e\nYZf4WcAlGzYJe4AFTdIjuSP7JE2JochIZtDGA0nGrSxGcMn9hCHbgwvAZtKlSoVm\nafy7n88EGzxG75UjbtlWlx1+NUhZiH5ZceHJA+KwcUJb0sceBZDmZTL8UMVdhefS\nMan5+LF0X5HVvZ7fXg8Db7Fy2qMHnJrcpt67WN2vFGtsEWdF9UzzCpuPDLb5Rtqu\nU1DCSws9GKH6Q3yNWYGymWtS2HSO/K7BDd2HvjXRURrG5aWXZp09LqKg12AT0BBV\nTH0eRcZD5UUxc+FwGTZmhDkRX2xaKI91byVFK1+19585So43nQY1hmeKyVMTjM1s\nIjzAS+HvAgMBAAECggEADbW+7QvBGkZYWSU6wJkcPm4rqRIU1d0I2RN/qlntTImQ\n+cWAzWsOaQyM4Q5CZUcgwwZAAmJxdsnaK+RPRNA7artxOfdovj6o0OUS9GzlgYEh\n/Pp8vZPLlkZnXSyL3hKWzhyf56BEiRCTyfmWvnLmcecHPDxYGU1AUeFSG6khApPB\nDOQOUOjnZggJa/AjBnzDeYqEpFYnohskifJ9xcSZkKJCvOT3CDzLFkFpjobvM3lD\n0mvs0U8bB97s1ZgvgXDqmNR0m51tgONasIUFniCKLMmV8CuOMwr9aW8nGjjyu71a\nYCQxlwKmQ9NZhGtXALXKbzCvLpE2b1CwwyxDOVYPMQKBgQDh3l97GlFUAB0Ndg7w\n6qgyh4jwGlhimEaRFUGlu/i2KxqaUxBD8y3wNAiSQvZOd7zgTyV/MG9rHhF21/ss\nKR0PZLKGq1AdCm6ue9wDYMbvNlgkte8eq995hSBdJamwU65JQ5JRaIq1lMdiZlZi\nNcPe4giunBP5q9LMrhB4qBw0SwKBgQDcvaB8rEACfTsYbNzFSt84COimPWx2rFhu\n/EKQAqeJ8IBzahUN60ZaIuJZgFvIUkvxPywHjKFTlHZASqfrkjCY5POKGGPcSHLs\nuXonqXZzw0l3xjBdDzbHjv7WT68+nGxU85Y+PbTO3pcCmpd0wo+vPQ79q7vPTOr4\n/0z5zK4abQKBgHcectaWe5vEb44A3EJcTxZO+n4+NqzQyC6NulBwwOs58k6/Tc24\nO1r55idU31dkuJzHwOvCHJCui+FUaKfSivvqTGjPgnG+Zb7pnY++g0v3Kic6OADB\n/hq1her6CPLwPvNuioUakETRURHpDNfAqSsrpA6KS9KZtpOxnQg1CKLfAoGAcS2A\n1atzflM7M4DNiRKkdJSMxH+F1yryhKUuc6wIvr7i/UoM1YAmKBzutTkM1h7r9RuQ\ntaYzKSlboAcnJa9k31+0Rr/Oo6k504odyawnoZ8lUhX5wh0E1zjIDJX6oj2NhdkG\n1Y7J369c+ebNdP40sYK65vFgcB9d8qDjlMiPE9kCgYBF9NqQweumbPZl5L9YP3dh\nVnlGycL5Bu2ZZhplaB9WBU6fMNlvQ4niUfAIpJ4BrPLhqhwb6ipO8NswuiMF6YKf\n2YcUsHq/S1R9129yKWN4hQ+xdE/ABVbmfx9obrzYyOzReFolj59zZ+TgeyY65zjJ\nhriLmvbbJ8L/xXy+MNZGSg==\n-----END PRIVATE KEY-----\n",
                FIREBASE_CLIENT_EMAIL:
                  "firebase-adminsdk-ovl5v@vibrato-c28f3.iam.gserviceaccount.com",
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
