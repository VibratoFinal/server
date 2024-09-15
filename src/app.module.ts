import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users/entity/users.entity";
import { FollowsModule } from "./follows/follows.module";
import { Follows } from "./follows/entity/follows.entity";
import { ImagesModule } from "./profileImages/images.module";
import { FirebaseService } from "./firebase/firebase.service";
import { FirebaseModule } from "./firebase/firebase.module";
import { ProfileImages } from "./profileImages/entity/images.entity";
import { ReivewsModule } from "./reviews/reviews.module";
import { Reviews } from "./reviews/entity/reviews.entity";
import { CommentsModule } from "./comments/comments.module";
import { Comments } from "./comments/entity/comments.entity";

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
