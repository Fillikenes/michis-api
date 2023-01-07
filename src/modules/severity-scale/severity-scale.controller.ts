import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { CreateSeverityScaleDto, UpdateSeverityScaleDto } from './dtos';
import { SeverityScaleService } from './severity-scale.service';

@Controller('severity-scale')
@UseInterceptors(TransformInterceptor)
export class SeverityScaleController {
  constructor(private readonly severityScaleService: SeverityScaleService) {}

  @Get()
  public async getSeveritiesScale() {
    return this.severityScaleService.getSeveritiesScale();
  }

  @Get('/:id')
  public async getSeverityScaleById(@Param('id') id: string) {
    return this.severityScaleService.getSeverityScaleById(id);
  }

  @Post()
  public async createSeverityScale(
    @Body() { name, description, icon }: CreateSeverityScaleDto,
  ) {
    return this.severityScaleService.createSeverityScale(
      name,
      description,
      icon,
    );
  }

  @Put('/:id')
  public async updateSeverityScale(
    @Param('id') id: string,
    @Body() { name, description, icon }: UpdateSeverityScaleDto,
  ) {
    return this.severityScaleService.updateSeverityScale(
      id,
      name,
      description,
      icon,
    );
  }

  @Delete(':id')
  public async deleteSeverityScaleById(@Param('id') id: string) {
    return this.severityScaleService.deleteSeverityScaleById(id);
  }
}
