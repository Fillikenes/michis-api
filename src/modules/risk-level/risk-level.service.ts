import { Injectable } from '@nestjs/common';
import { RiskLevel } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class RiskLevelService {
  private readonly model = this.prismaService.riskLevel;

  constructor(private readonly prismaService: PrismaService) {}

  public async getRiskLevels(): Promise<RiskLevel[]> {
    return this.model.findMany({ include: { foods: true } });
  }

  public async getRiskLevelById(id: string): Promise<RiskLevel> {
    return this.model.findFirst({ where: { id } });
  }

  public async createRiskLevel(name: string): Promise<RiskLevel> {
    return this.model.create({
      data: {
        name,
      },
    });
  }

  public async updateRiskLevel(id: string, name: string): Promise<RiskLevel> {
    return this.model.update({
      where: { id },
      data: { name },
    });
  }

  public async deleteRiskLevelById(id: string): Promise<RiskLevel> {
    return this.model.delete({
      where: { id },
    });
  }
}
