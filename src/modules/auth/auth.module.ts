import { Module } from "@nestjs/common";
import { UsersController } from "./auth.controller";
import { UsersService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entity/auth.entity";
import { FirebaseModule } from "src/config/firebase/firebase.module";
import { ProfileImages } from "src/modules/profile/entity/profile-images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, ProfileImages]), FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
