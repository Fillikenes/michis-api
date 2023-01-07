import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { ICreateFoodParams, IUpdateFoodParams } from './params';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class FoodService {
  private readonly model = this.prismaService.food;

  constructor(private readonly prismaService: PrismaService) {}

  public async getFoods(): Promise<Food[]> {
    return this.model.findMany({
      include: {
        consumeFrequency: true,
        category: true,
        riskLevel: true,
        symptoms: true,
      },
    });
  }

  public async getById(id: string): Promise<Food> {
    return this.model.findFirst({
      where: { id },
      include: {
        consumeFrequency: true,
        category: true,
        riskLevel: true,
        symptoms: true,
      },
    });
  }

  public async create(params: ICreateFoodParams): Promise<Food> {
    return this.model.create({
      data: params,
    });
  }

  public async update(id: string, params: IUpdateFoodParams): Promise<Food> {
    return this.model.update({
      where: { id },
      data: params,
    });
  }

  public async deleteById(id: string): Promise<Food> {
    return this.model.delete({
      where: { id },
    });
  }
}
