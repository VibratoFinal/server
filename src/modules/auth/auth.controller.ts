import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Put,
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

    return await this.usersService.joinUser(uid, createUserDTO);
  }

  @UseGuards(FirebaseAuthGuard)
  @Put("edit")
  async editUser(@Request() req, @Body() userEdit: CreateUserDTO) {
    const { uid } = req.user;

    return await this.usersService.editUser(uid, userEdit);
  }
}
