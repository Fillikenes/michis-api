import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from './dtos';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  public async getFood() {
    return this.foodService.getFoods();
  }

  @Get('/:id')
  public async getFoodById(@Param('id') id: string) {
    return this.foodService.getById(id);
  }

  @Post()
  public async createFood(@Body() params: CreateFoodDto) {
    return this.foodService.create(params);
  }

  @Put('/:id')
  public async updateFood(
    @Param('id') id: string,
    @Body() params: UpdateFoodDto,
  ) {
    return this.foodService.update(id, params);
  }

  @Delete(':id')
  public async deleteFoodById(@Param('id') id: string) {
    return this.foodService.deleteById(id);
  }
}
