import { Module } from '@nestjs/common';
import { SeverityScaleService } from './severity-scale.service';
import { SeverityScaleController } from './severity-scale.controller';
import { PrismaModule } from '../../shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeverityScaleController],
  providers: [SeverityScaleService],
  exports: [SeverityScaleService],
})
export class SeverityScaleModule {}
