import { Category } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }
}
