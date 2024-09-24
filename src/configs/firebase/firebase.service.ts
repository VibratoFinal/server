import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import admin from "firebase-admin";

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const firebaseAppName = "vibrato";
    const privateKey = this.configService.get<string>("FIREBASE_PRIVATE_KEY");
    const ex = privateKey.replace(/\\n/gm, "\n");
    if (!privateKey) {
      throw new Error("FIREBASE_PRIVATE_KEY is not defined");
    }
    if (!admin.apps.length) {
      admin.initializeApp(
        {
          credential: admin.credential.cert({
            projectId: this.configService.get<string>("FIREBASE_PROJECT_ID"),
            privateKey: privateKey.replace(/\\n/g, "\n"),
            clientEmail: this.configService.get<string>(
              "FIREBASE_CLIENT_EMAIL",
            ),
          }),
        },
        firebaseAppName,
      );
    } else {
      console.log("Firebase app already initialized");
      console.log("privateKey", privateKey);
      console.log("privateKey replace", ex);
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
