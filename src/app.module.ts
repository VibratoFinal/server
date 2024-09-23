import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./modules/auth/entity/auth.entity";
import { FollowsModule } from "./modules/follows/follows.module";
import { Follows } from "./modules/follows/entity/follows.entity";
import { ImagesModule } from "./modules/profile/profile-images.module";
import { FirebaseService } from "./configs/firebase/firebase.service";
import { FirebaseModule } from "./configs/firebase/firebase.module";
import { ProfileImages } from "./modules/profile/entity/profile-images.entity";
import { ReivewsModule } from "./modules/reviews/reviews.module";
import { Reviews } from "./modules/reviews/entity/reviews.entity";
import { CommentsModule } from "./modules/comments/comments.module";
import { Comments } from "./modules/comments/entity/comments.entity";
import { LikesComments } from "./modules/likes/entity/likesComment.entity";
import { LikesReviews } from "./modules/likes/entity/likesReview.entity";
import { LikesModule } from "./modules/likes/likes.module";
import { MusicsModule } from "./modules/musics/musics.module";
import { ChartsModule } from "./modules/charts/charts.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { SearchsModule } from "./modules/searchs/searchs.module";

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
        ProfileImages,
        Reviews,
        Comments,
        LikesComments,
        LikesReviews,
      ],
      synchronize: true,
    }),
    MusicsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // 비밀 키
      signOptions: { expiresIn: "10s" }, // 만료 시간
    }),
    FollowsModule,
    ImagesModule,
    FirebaseModule,
    ReivewsModule,
    ChartsModule,
    CommentsModule,
    LikesModule,
    SearchsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    FirebaseService,
  ],
})
export class AppModule {}
