import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';
import { SeverityScaleModule } from '../severity-scale/severity-scale.module';

@Module({
  controllers: [SymptomController],
  providers: [SymptomService],
  imports: [PrismaModule, SeverityScaleModule],
})
export class SymptomModule {}
