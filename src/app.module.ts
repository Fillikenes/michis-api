import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { RiskLevelModule } from './modules/risk-level/risk-level.module';

@Module({
  imports: [ConfigModule, PrismaModule, CategoryModule, RiskLevelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
