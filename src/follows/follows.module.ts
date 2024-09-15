import { Module } from "@nestjs/common";
import { FollowsController } from "./follows.controller";
import { FollowsService } from "./follows.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follows } from "./entity/follows.entity";
import { Users } from "src/users/entity/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Follows, Users])],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
