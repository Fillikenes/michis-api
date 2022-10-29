import { Category } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  public async getCategoryById(id: string): Promise<Category> {
    return this.prismaService.category.findFirst({ where: { id } });
  }

  public async createCategory(name: string): Promise<Category> {
    return this.prismaService.category.create({
      data: {
        name,
      },
    });
  }

  public async updateCategory(id: string, name: string): Promise<Category> {
    return this.prismaService.category.update({
      where: { id },
      data: { name },
    });
  }

  public async deleteCategoryById(id: string): Promise<Category> {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
