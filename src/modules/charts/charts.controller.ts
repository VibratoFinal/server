import {
  Body,
  Controller,
  Get,
  HttpCode,
  Query,
  Request,
} from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { ChartsDTO } from "./dto/create-charts.dto";
import { LimitDTO } from "./dto/chart-limit.dto";
import { SkipAuthOptional } from "@/common/decorators/skip-auth-optional.decorator";
import { getUid } from "@/common/utils/helpers";

@Controller("charts")
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get("global")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50(@Request() req): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50(uid);
  }

  @Get("korea")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50(@Request() req): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50(uid);
  }

  @Get("global/weekly")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50Weekly(@Request() req): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50Weekly(uid);
  }
  @Get("korea/weekly")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50Weekly(@Request() req): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50Weekly(uid);
  }

  @Get("korea/recent")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaRecent(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKoreaRecent(uid, body);
  }

  @Get("korea/recent_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaRecentByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKoreaRecent(uid, query);
  }

  @Get("genres/animarnb")
  @SkipAuthOptional()
  @HttpCode(202)
  async animarnb(@Request() req, @Body() body: LimitDTO): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAnimaRnB(uid, body);
  }

  @Get("genres/animarnb_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async animarnbByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAnimaRnB(uid, query);
  }
}
