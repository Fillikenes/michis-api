import { Symptom } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { SeverityScaleService } from '../severity-scale/severity-scale.service';
import { ICreateSymptomParams, IUpdateSymptomParams } from './params';

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

  public async createSymptom(params: ICreateSymptomParams): Promise<Symptom> {
    await this.severityScaleService.getSeverityScaleById(
      params.severityScaleId,
    );

    return this.model.create({
      data: params,
    });
  }

  public async updateSymptom(
    id: string,
    params: IUpdateSymptomParams,
  ): Promise<Symptom> {
    return this.model.update({
      where: { id },
      data: params,
    });
  }

  public async deleteSymptomById(id: string): Promise<Symptom> {
    return this.model.delete({
      where: { id },
    });
  }
}
