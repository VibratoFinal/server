import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { Reflector } from "@nestjs/core";
import { SKIP_AUTH_KEY } from "../decorators/skip-auth.decorator";
import { Request } from "express";
import { SKIP_AUTH_OPTIONAL_KEY } from "../decorators/skip-auth-optional.decorator";

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    const skipAuth = this.reflector.get<boolean>(
      SKIP_AUTH_KEY,
      context.getHandler(),
    );
    if (skipAuth) {
      return true;
    }

    const skipAuthOptional = this.reflector.get<boolean>(
      SKIP_AUTH_OPTIONAL_KEY,
      context.getHandler(),
    );
    if (skipAuthOptional) {
      if (!authHeader) {
        return true;
      }
    }

    const idToken = this.extractToken(authHeader);

    const decodedToken = await this.verifyToken(idToken);
    request.user = decodedToken;

    return true;
  }

  private extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpException(
        "Unauthorized: Missing or invalid authorization header",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return authHeader.split("Bearer ")[1];
  }

  private async verifyToken(idToken: string) {
    try {
      const decodedToken =
        await this.firebaseService.admin.verifyIdToken(idToken);

      return decodedToken;
    } catch (error) {
      console.error("Firebase ID token verification failed:", error);
      if (error.code === "auth/id-token-expired") {
        throw new HttpException(
          "Unauthorized: ID token has expired",
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (error.code === "auth/invalid-id-token") {
        throw new HttpException(
          "Unauthorized: Invalid ID token",
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        "Unauthorized: ID token verification failed",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
