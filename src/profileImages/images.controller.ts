import { Body, Controller, Get, Post } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { CreateImageDTO } from "./dto/create-images.dto";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getProfileImages() {
    const images = await this.imagesService.getProfileImage();

    return images;
  }

  @Post()
  async createProfileImage(
    @Body()
    createImageDTO: CreateImageDTO,
  ) {
    return this.imagesService.addProfileImage(createImageDTO);
  }
}
