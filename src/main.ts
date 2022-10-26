import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './shared/services/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { config } = app.get(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);

  const prismaServiceInstance = app.get(PrismaService);
  await prismaServiceInstance.enableShutdownHooks(app);
}
bootstrap();
