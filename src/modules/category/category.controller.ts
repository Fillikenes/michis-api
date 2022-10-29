import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getCategories() {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  public async getCategory(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  public async createCategory(@Body() { name }: CreateCategoryDto) {
    return this.categoryService.createCategory(name);
  }

  @Put('/:id')
  public async updateCategory(
    @Param('id') id: string,
    @Body() { name }: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, name);
  }

  @Delete('/:id')
  public async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategoryById(id);
  }
}
