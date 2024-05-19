import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import corsOptions from '@/docs/config';
import ConfigEnv from '@/config/config.env';
import buildApiDocs from '@/docs/swagger.builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (Number(ConfigEnv.DOCS_GENERATE) === 1) {
    buildApiDocs(app, ConfigEnv);
  }

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ConfigEnv.API_SERVER_PORT);
}
bootstrap();
