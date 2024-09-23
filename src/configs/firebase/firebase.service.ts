import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import admin from "firebase-admin";

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const firebaseAppName = "vibrato";

    if (!admin) {
      admin.initializeApp(
        {
          credential: admin.credential.cert({
            projectId: this.configService.get<string>("FIREBASE_PROJECT_ID"),
            privateKey: this.configService
              .get<string>("FIREBASE_PRIVATE_KEY")
              .replace(/\\n/g, "\n"),
            clientEmail: this.configService.get<string>(
              "FIREBASE_CLIENT_EMAIL",
            ),
          }),
        },
        firebaseAppName,
      );
    } else {
      console.log("Firebase app already initialized");
    }
  }
  async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      throw new Error(`${error} Invalid token`);
    }
  }
}
