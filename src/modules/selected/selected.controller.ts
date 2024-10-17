import { Controller, Get, HttpCode, Request, UseGuards } from "@nestjs/common";
import { SelectedService } from "./selected.service";
import { FirebaseAuthGuard } from "@/common/guards/firebase-auth.guard";
import { getUid } from "@/common/utils/helpers";

@Controller("selected")
export class SelectedController {
  constructor(private readonly selectedService: SelectedService) {}

  @Get("/tracks")
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(202)
  async getTracks(@Request() req) {
    const uid = getUid(req);
    return this.selectedService.likedTracks(uid);
  }

  @Get("/albums")
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(202)
  async getAlbums(@Request() req) {
    const uid = getUid(req);
    return this.selectedService.likedAlbums(uid);
  }

  @Get("/artists")
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(202)
  async getArtists(@Request() req) {
    const uid = getUid(req);
    return this.selectedService.likedArtists(uid);
  }
}
