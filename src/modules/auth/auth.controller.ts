import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Put,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./auth.service";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { UserResponseDTO } from "./dto/create-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("login")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async getUser(@Request() req) {
    const { uid } = req.user;

    return await this.usersService.getUser(uid);
  }

  @Post("join")
  @HttpCode(201)
  @UseGuards(FirebaseAuthGuard)
  async createUser(
    @Request() req,
    @Body()
    createUserDTO: UserResponseDTO,
  ) {
    const { uid } = req.user;

    return await this.usersService.joinUser(uid, createUserDTO);
  }

  @Put("edit")
  @HttpCode(200)
  @UseGuards(FirebaseAuthGuard)
  async editUser(@Request() req, @Body() userEdit: UserResponseDTO) {
    const { uid } = req.user;

    return await this.usersService.editUser(uid, userEdit);
  }
}
