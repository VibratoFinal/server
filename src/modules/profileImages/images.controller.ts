import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProfileImagesService } from "./images.service";
import { CreateImageDTO } from "./dto/create-images.dto";

@Controller("images")
export class ImagesController {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Get()
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
