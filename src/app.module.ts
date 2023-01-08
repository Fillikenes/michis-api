import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { FoodModule } from './modules/food/food.module';
import { SymptomModule } from './modules/symptom/symptom.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { RiskLevelModule } from './modules/risk-level/risk-level.module';
import { SeverityScaleModule } from './modules/severity-scale/severity-scale.module';
import { ConsumeFrequencyModule } from './modules/consume-frequency/consume-frequency.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    CategoryModule,
    RiskLevelModule,
    ConsumeFrequencyModule,
    SeverityScaleModule,
    SymptomModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
