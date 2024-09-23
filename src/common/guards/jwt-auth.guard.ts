import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../../modules/auth/entity/auth.entity"; // User 엔티티 가져오기
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = this.jwtService.verify(token);
      request.user = await this.userRepository.findOne({
        where: { uid: payload.uid },
      }); // TypeORM으로 사용자 조회
      return !!request.user; // 사용자 존재 여부 반환
    } catch {
      return false;
    }
  }
}
