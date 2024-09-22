import { Body, Controller, Get } from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { ChartsDTO } from "./dto/create-charts.dto";
import { LimitDTO } from "./dto/chart-limit.dto";

@Controller("charts")
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get("global")
  async globalTop50(): Promise<ChartsDTO[]> {
    return this.chartsService.getGlobal50();
  }

  @Get("korea")
  async koreaTop50(): Promise<ChartsDTO[]> {
    return this.chartsService.getKorea50();
  }

  @Get("global/weekly")
  async globalTop50Weekly(): Promise<ChartsDTO[]> {
    return this.chartsService.getGlobal50Weekly();
  }
  @Get("korea/weekly")
  async koreaTop50Weekly(): Promise<ChartsDTO[]> {
    return this.chartsService.getKorea50Weekly();
  }

  @Get("korea/recent")
  async koreaRecent(@Body() body: LimitDTO): Promise<ChartsDTO[]> {
    return this.chartsService.getKoreaRecent(body);
  }

  @Get("genres/animarnb")
  async animarnb(@Body() body: LimitDTO): Promise<ChartsDTO[]> {
    return this.chartsService.getAnimaRnB(body);
  }
}
