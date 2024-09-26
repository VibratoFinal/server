import { Body, Controller, Get } from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { ChartsDTO } from "./dto/create-charts.dto";
import { LimitDTO } from "./dto/chart-limit.dto";
import { SkipAuth } from "@/common/decorators/skip-auth.decorator";

@Controller("charts")
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get("global")
  @SkipAuth()
  async globalTop50(): Promise<ChartsDTO[]> {
    return this.chartsService.getGlobal50();
  }

  @Get("korea")
  @SkipAuth()
  async koreaTop50(): Promise<ChartsDTO[]> {
    return this.chartsService.getKorea50();
  }

  @Get("global/weekly")
  @SkipAuth()
  async globalTop50Weekly(): Promise<ChartsDTO[]> {
    return this.chartsService.getGlobal50Weekly();
  }
  @Get("korea/weekly")
  @SkipAuth()
  async koreaTop50Weekly(): Promise<ChartsDTO[]> {
    return this.chartsService.getKorea50Weekly();
  }

  @Get("korea/recent")
  @SkipAuth()
  async koreaRecent(@Body() body: LimitDTO): Promise<ChartsDTO[]> {
    return this.chartsService.getKoreaRecent(body);
  }

  @Get("genres/animarnb")
  @SkipAuth()
  async animarnb(@Body() body: LimitDTO): Promise<ChartsDTO[]> {
    return this.chartsService.getAnimaRnB(body);
  }
}
