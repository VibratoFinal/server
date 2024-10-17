import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptors";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  const frontendUrl = configService.get<string>("FRONTEND_URL");
  console.log(frontendUrl);

  app.enableCors({
    origin: frontendUrl, // 프론트엔드 서버의 주소
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(8080);
}
bootstrap();
