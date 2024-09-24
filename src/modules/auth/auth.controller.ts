import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { FirebaseService } from "@/configs/firebase/firebase.service";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
@Controller("auth")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
  ) {}
  @UseGuards(FirebaseAuthGuard)
  @Get("login")
  async getUser(@Headers("Authorization") authHeader: string) {
    try {
      const user = await this.usersService.getUser(authHeader);
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

  @UseGuards(FirebaseAuthGuard)
  @Post("join")
  async createUser(
    @Headers("Authorization") authHeader: string,
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return this.usersService.joinUser(authHeader, createUserDTO);
  }

  @UseGuards(FirebaseAuthGuard)
  @Put("edit")
  async editUser(
    @Headers("Authorization") authHeader: string,
    @Body() userEdit: CreateUserDTO,
  ) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Authorization header is missing or invalid",
      );
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
      const uid = await this.firebaseService.verifyToken(idToken);
      return this.usersService.editUser(uid, userEdit);
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid Firebase Token: ${error.message}`,
      );
    }
  }
}
