import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CategoryModule } from './modules/category/category.module';
import { ConsumeFrequencyModule } from './modules/consume-frequency/consume-frequency.module';
import { FoodModule } from './modules/food/food.module';
import { RiskLevelModule } from './modules/risk-level/risk-level.module';
import { SeverityScaleModule } from './modules/severity-scale/severity-scale.module';
import { SymptomModule } from './modules/symptom/symptom.module';
import { PrismaModule } from './shared/services/prisma/prisma.module';

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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
