import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./modules/auth/entity/auth.entity";
import { FollowsModule } from "./modules/follows/follows.module";
import { Follows } from "./modules/follows/entity/follows.entity";
import { ImagesModule } from "./modules/profileImages/images.module";
import { FirebaseService } from "./config/firebase/firebase.service";
import { FirebaseModule } from "./config/firebase/firebase.module";
import { ProfileImages } from "./modules/profileImages/entity/images.entity";
import { ReivewsModule } from "./modules/reviews/reviews.module";
import { Reviews } from "./modules/reviews/entity/reviews.entity";
import { CommentsModule } from "./modules/comments/comments.module";
import { Comments } from "./modules/comments/entity/comments.entity";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [".development.env"],
    }),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Follows, ProfileImages, Reviews, Comments],
      synchronize: true,
    }),
    FollowsModule,
    ImagesModule,
    FirebaseModule,
    ReivewsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
