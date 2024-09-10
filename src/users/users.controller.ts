import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    console.log(user);
    return this.usersService.create(user);
  }
}
