import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// Firebase 서비스 계정 인터페이스 정의
interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string; // 선택적 속성
}

export const getAdminAuth = (configService: ConfigService) => {
  const serviceAccount: ServiceAccount = {
    type: configService.get<string>("FIREBASE_TYPE"),
    project_id: configService.get<string>("FIREBASE_PROJECT_ID"),
    private_key_id: configService.get<string>("FIREBASE_PRIVATE_KEY_ID"),
    private_key: configService.get<string>("FIREBASE_PRIVATE_KEY"),
    client_email: configService.get<string>("FIREBASE_CLIENT_EMAIL"),
    client_id: configService.get<string>("FIREBASE_CLIENT_ID"),
    auth_uri: configService.get<string>("FIREBASE_AUTH_URI"),
    token_uri: configService.get<string>("FIREBASE_TOKEN_URI"),
    auth_provider_x509_cert_url: configService.get<string>(
      "FIREBASE_AUTH_CERT_URL",
    ),
    client_x509_cert_url: configService.get<string>("FIREBASE_CLIENT_CERT_URL"),
    universe_domain: configService.get<string>("FIREBASE_UNIVERSE_DOMAIN"),
  };
  try {
    if (!admin.apps.length) {
      const app = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        databaseURL: `https://${configService.get<string>("FIREBASE_PROJECT_ID")}.firebaseio.com`,
      });
      console.log("Firebase app initialized.");
      return getAuth(app);
    } else {
      console.log("Firebase app already initialized.");
      return getAuth();
    }
  } catch (error) {
    console.error("Error initializing Firebase app:", error);
    throw new Error("Firebase initialization error");
  }
};
