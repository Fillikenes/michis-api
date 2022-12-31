import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/services/prisma/prisma.module';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [PrismaModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
