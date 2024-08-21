import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import * as cookieParser from 'cookie-parser';
import * as gitBranch from 'git-branch';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const currentBranch = await gitBranch();
  const isMainBranch = currentBranch === 'main';

  const frontUrl = isMainBranch
    ? process.env.DEPLOY_FRONTEND_URL
    : process.env.FRONTEND_URL;

  const backUrl = isMainBranch
    ? process.env.DEPLOY_BACK_URL
    : process.env.BACKEND_URL;

  process.env.FRONTEND_URL = frontUrl;
  process.env.BACKEND_URL = backUrl;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',/*  frontUrl, */
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle("Real State Nest API")
    .setDescription("Post or search your dream home")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const sequelize = app.get(Sequelize);
  await sequelize.sync();
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
