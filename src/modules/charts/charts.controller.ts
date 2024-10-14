import {
  Body,
  Controller,
  HttpCode,
  Put,
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

  @Put("global")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50(uid, body);
  }

  @Put("global_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50ByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50(uid, query);
  }

  @Put("korea")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50(uid, body);
  }

  @Put("korea_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50ByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50(uid, query);
  }

  @Put("global/weekly")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50Weekly(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50Weekly(uid, body);
  }

  @Put("global/weekly_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async globalTop50WeeklyByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getGlobal50Weekly(uid, query);
  }

  @Put("korea/weekly")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50Weekly(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50Weekly(uid, body);
  }

  @Put("korea/weekly_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaTop50WeeklyByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKorea50Weekly(uid, query);
  }

  @Put("korea/recent")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaRecent(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKoreaRecent(uid, body);
  }

  @Put("korea/recent_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async koreaRecentByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKoreaRecent(uid, query);
  }

  @Put("genres/animarnb")
  @SkipAuthOptional()
  @HttpCode(202)
  async animarnb(@Request() req, @Body() body: LimitDTO): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAnimaRnB(uid, body);
  }

  @Put("genres/animarnb_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async animarnbByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAnimaRnB(uid, query);
  }

  @Put("genres/jazzforsleep")
  @SkipAuthOptional()
  @HttpCode(202)
  async jazzforSleep(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getJazzforSleep(uid, body);
  }

  @Put("genres/jazzforsleep_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async jazzforSleepByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getJazzforSleep(uid, query);
  }

  @Put("genres/kpopdance")
  @SkipAuthOptional()
  @HttpCode(202)
  async kpopDance(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKpopDance(uid, body);
  }

  @Put("genres/kpopdance_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async kpopDanceByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getKpopDance(uid, query);
  }

  @Put("genres/alltimehighest")
  @SkipAuthOptional()
  @HttpCode(202)
  async allTimeHighestRatedSongs(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAllTimeHighestRated(uid, body);
  }

  @Put("genres/alltimehighest_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async allTimeHighestRatedSongsByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getAllTimeHighestRated(uid, query);
  }

  @Put("genres/todayshit")
  @SkipAuthOptional()
  @HttpCode(202)
  async todaysHit(
    @Request() req,
    @Body() body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getTodaysHit(uid, body);
  }

  @Put("genres/todayshit_query")
  @SkipAuthOptional()
  @HttpCode(202)
  async todaysHitByQuery(
    @Request() req,
    @Query() query: LimitDTO,
  ): Promise<ChartsDTO[]> {
    const uid = getUid(req);
    return this.chartsService.getTodaysHit(uid, query);
  }
}
