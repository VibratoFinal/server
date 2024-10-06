import { Module } from "@nestjs/common";
import { UsersController } from "./auth.controller";
import { UsersService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entity/auth.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
@Module({
  imports: [TypeOrmModule.forFeature([Users]), FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
