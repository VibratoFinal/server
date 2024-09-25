import {
  Body,
  Controller,
  Get,
  Headers,
  Request,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get("login")
  async getUser(@Request() req) {
    const { uid } = req.user;
    console.log(uid);

    if (!uid) {
      throw new UnauthorizedException("User not found");
    }

    return await this.usersService.getUser(uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post("join")
  async createUser(
    @Request() req,
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    const { uid } = req.user;
    if (!uid) {
      throw new UnauthorizedException("User not found");
    }

    return await this.usersService.joinUser(uid, createUserDTO);
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

    try {
      return this.usersService.editUser(authHeader, userEdit);
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid Firebase Token: ${error.message}`,
      );
    }
  }
}
