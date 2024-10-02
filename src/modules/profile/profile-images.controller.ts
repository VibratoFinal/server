import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProfileImagesService } from "./profile-images.service";
import { CreateImageDTO } from "./dto/create-images.dto";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

@Controller("profile")
export class ImagesController {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Get("profileImage")
  @SkipAuth()
  async getProfileImages() {
    return await this.profileImagesService.getAllImages();
  }

  @Post()
  @SkipAuth()
  createProfileImage(
    @Body()
    createImageDTO: CreateImageDTO,
  ) {
    return this.profileImagesService.addProfileImage(createImageDTO);
  }
}
