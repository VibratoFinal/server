import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { FirebaseService } from "src/firebase/firebase.service";
@Controller("auth")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get("login")
  async getUser(@Headers("Authorization") authHeader: string) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Authorization header is missing or invalid",
      );
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
      // const decodedToken = await this.firebaseService.verifyToken(idToken);
      // decodedToken 넣어야함
      const uid = idToken;
      // 임시 uid
      const user = await this.usersService.getUser(uid);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid Firebase Token: ${error.message}`,
      );
    }
  }

  @Post("join")
  async createUser(
    @Headers("Authorization") authHeader: string,
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Authorization header is missing or invalid",
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    try {
      // const uid = await this.firebaseService.verifyToken(idToken);
      const uid = idToken; // 프론트 연결 후 위에 uid사용

      return this.usersService.joinUser(uid, createUserDTO);
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid Firebase Token: ${error.message}`,
      );
    }
  }
}
