import { Module } from "@nestjs/common";
import { FollowsController } from "./follows.controller";
import { FollowsService } from "./follows.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follows } from "./entity/follows.entity";
import { Users } from "@modules/auth/entity/auth.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";

@Module({
  imports: [TypeOrmModule.forFeature([Follows, Users]), FirebaseModule],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
