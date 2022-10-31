import { Injectable } from '@nestjs/common';
import { ConsumeFrequency } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class ConsumeFrequencyService {
  private readonly model = this.prismaService.consumeFrequency;

  constructor(private readonly prismaService: PrismaService) {}

  public async getConsumeFrequencies(): Promise<ConsumeFrequency[]> {
    return this.model.findMany();
  }

  public async getConsumeFrequencyById(id: string): Promise<ConsumeFrequency> {
    return this.model.findFirst({ where: { id } });
  }

  public async createConsumeFrequency(
    frequency: string,
  ): Promise<ConsumeFrequency> {
    return this.model.create({
      data: {
        frequency,
      },
    });
  }

  public async updateConsumeFrequency(
    id: string,
    frequency: string,
  ): Promise<ConsumeFrequency> {
    return this.model.update({
      where: { id },
      data: { frequency },
    });
  }

  public async deleteConsumeFrequencyById(
    id: string,
  ): Promise<ConsumeFrequency> {
    return this.model.delete({
      where: { id },
    });
  }
}
