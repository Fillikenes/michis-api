import { Symptom } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { SeverityScaleService } from '../severity-scale/severity-scale.service';

@Injectable()
export class SymptomService {
  private readonly model = this.prismaService.symptom;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly severityScaleService: SeverityScaleService,
  ) {}

  public async getSymptoms(): Promise<Symptom[]> {
    return this.model.findMany({
      include: { severityScale: true, foods: true },
    });
  }

  public async getSymptomById(id: string): Promise<Symptom> {
    return this.model.findFirst({
      where: { id },
      include: { severityScale: true, foods: true },
    });
  }

  public async createSymptom(
    name: string,
    severityScaleId: string,
  ): Promise<Symptom> {
    await this.severityScaleService.getSeverityScaleById(severityScaleId);

    return this.model.create({
      data: {
        name,
        severityScaleId,
      },
    });
  }

  public async updateSymptom(
    id: string,
    name: string,
    severityScaleId: string,
  ): Promise<Symptom> {
    return this.model.update({
      where: { id },
      data: {
        name,
        severityScaleId,
      },
    });
  }

  public async deleteSymptomById(id: string): Promise<Symptom> {
    return this.model.delete({
      where: { id },
    });
  }
}
