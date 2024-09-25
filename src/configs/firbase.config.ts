import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

export const getAdminAuth = (configService: ConfigService) => {
  const serviceAccount = {
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

  if (!admin.apps.length) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${configService.get<string>("FIREBASE_PROJECT_ID")}.firebaseio.com`,
    });
    console.log("Firebase app initialized.");
    return getAuth(app);
  } else {
    console.log("Firebase app already initialized.");
    return getAuth();
  }
};
