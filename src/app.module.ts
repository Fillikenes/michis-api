import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [ConfigModule, PrismaModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public config = this.configService.config;

  constructor(private readonly configService: ConfigService) {}
}
