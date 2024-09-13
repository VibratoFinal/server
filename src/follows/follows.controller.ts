// import { Controller, Get, Headers, Param, Post } from "@nestjs/common";
// import { FollowsService } from "./follows.service";

// @Controller("follows")
// export class FollowsController {
//   constructor(private readonly followsService: FollowsService) {}

//   @Get()
//   findFollows(@Headers("Authorization") user_uid: string) {
//     return this.followsService.find({
//       user_uid,
//     });
//   }

//   @Post(":type_id")
//   createFollows(
//     @Param("type_id") type_id: number,
//     @Headers("Authorization") user_uid: string,
//   ) {
//     return this.followsService.create({
//       type_id: type_id,
//       user_uid: user_uid,
//     });
//   }
// }
