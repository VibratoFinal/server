// src/auth/firebase-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FirebaseService } from "@/configs/firebase/firebase.service";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken = this.extractToken(request.headers["authorization"]);

    // Firebase 토큰 검증
    await this.verifyToken(idToken, request);

    return true; // 인증 성공
  }

  private extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return authHeader.split("Bearer ")[1];
  }

  private async verifyToken(idToken: string, request: any) {
    try {
      const decodedToken = await this.firebaseService.verifyToken(idToken);
      request.user = decodedToken; // 요청 객체에 사용자 정보 추가
    } catch (error) {
      console.log(error);
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
