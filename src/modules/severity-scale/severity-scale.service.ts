import { Injectable } from '@nestjs/common';
import { SeverityScale } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class SeverityScaleService {
  private readonly model = this.prismaService.severityScale;

  constructor(private readonly prismaService: PrismaService) {}

  public async getSeveritiesScale(): Promise<SeverityScale[]> {
    return this.model.findMany();
  }

  public async getSeverityScaleById(id: string): Promise<SeverityScale> {
    return this.model.findFirst({ where: { id } });
  }

  public async createSeverityScale(
    name: string,
    description: string,
    icon: string,
  ): Promise<SeverityScale> {
    return this.model.create({
      data: {
        name,
        description,
        icon,
      },
    });
  }

  public async updateSeverityScale(
    id: string,
    name: string,
    description: string,
    icon: string,
  ): Promise<SeverityScale> {
    return this.model.update({
      where: { id },
      data: {
        name,
        description,
        icon,
      },
    });
  }

  public async deleteSeverityScaleById(id: string): Promise<SeverityScale> {
    return this.model.delete({
      where: { id },
    });
  }
}
