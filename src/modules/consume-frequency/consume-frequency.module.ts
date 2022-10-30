import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/services/prisma/prisma.module';
import { ConsumeFrequencyController } from './consume-frequency.controller';
import { ConsumeFrequencyService } from './consume-frequency.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConsumeFrequencyController],
  providers: [ConsumeFrequencyService],
})
export class ConsumeFrequencyModule {}
