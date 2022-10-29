import { Module } from '@nestjs/common';
import { RiskLevelService } from './risk-level.service';
import { RiskLevelController } from './risk-level.controller';
import { PrismaModule } from '../../shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RiskLevelController],
  providers: [RiskLevelService],
})
export class RiskLevelModule {}
