import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./modules/auth/entity/auth.entity";
import { FollowsModule } from "./modules/follows/follows.module";
import { Follows } from "./modules/follows/entity/follows.entity";
import { FirebaseService } from "./configs/firebase/firebase.service";
import { FirebaseModule } from "./configs/firebase/firebase.module";
import { ReivewsModule } from "./modules/reviews/reviews.module";
import { Reviews } from "./modules/reviews/entity/reviews.entity";
import { CommentsModule } from "./modules/comments/comments.module";
import { Comments } from "./modules/comments/entity/comments.entity";
import { LikesComments } from "./modules/likes/entity/likesComment.entity";
import { LikesReviews } from "./modules/likes/entity/likesReview.entity";
import { LikesModule } from "./modules/likes/likes.module";
import { MusicsModule } from "./modules/musics/musics.module";
import { ChartsModule } from "./modules/charts/charts.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { SearchsModule } from "./modules/searchs/searchs.module";
import { FirebaseAuthGuard } from "./common/guards/firebase-auth.guard";
import { LikesType } from "./modules/likes/entity/likesType.entity";
import { SelectedModule } from "./modules/selected/selected.module";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [".development.env"],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        Follows,
        Reviews,
        Comments,
        LikesComments,
        LikesReviews,
        LikesType,
      ],
      synchronize: true,
    }),
    MusicsModule,
    FollowsModule,
    FirebaseModule,
    ReivewsModule,
    ChartsModule,
    CommentsModule,
    LikesModule,
    SearchsModule,
    SelectedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    FirebaseService,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
  ],
  exports: [FirebaseService],
})
export class AppModule {}
