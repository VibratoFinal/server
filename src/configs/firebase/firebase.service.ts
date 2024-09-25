import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getAdminAuth } from "@/configs/firbase.config";
import { Auth as AdminAuth } from "firebase-admin/auth";

@Injectable()
export class FirebaseService {
  admin: AdminAuth;

  constructor(private configService: ConfigService) {
    this.admin = getAdminAuth(configService);
  }
}
