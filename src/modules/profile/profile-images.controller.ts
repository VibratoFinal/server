import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProfileImagesService } from "./profile-images.service";
import { CreateImageDTO } from "./dto/create-images.dto";

@Controller("profile")
export class ImagesController {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Get("profileImage")
  async getProfileImages() {
    const images = await this.profileImagesService.getAllImages();

    return images;
  }

  @Post()
  createProfileImage(
    @Body()
    createImageDTO: CreateImageDTO,
  ) {
    return this.profileImagesService.addProfileImage(createImageDTO);
  }
}
