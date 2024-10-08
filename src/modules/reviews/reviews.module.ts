import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "./entity/reviews.entity";
import { FirebaseModule } from "@/configs/firebase/firebase.module";
import { Comments } from "../comments/entity/comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reviews, Comments]), FirebaseModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReivewsModule {}
