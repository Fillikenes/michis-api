import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSymptomDto, UpdateSymptomDto } from './dtos';
import { SymptomService } from './symptom.service';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Get()
  public async getSymptoms() {
    return this.symptomService.getSymptoms();
  }

  @Get('/:id')
  public async getSymptomById(@Param('id') id: string) {
    return this.symptomService.getSymptomById(id);
  }

  @Post()
  public async createSymptom(
    @Body() { name, severityScaleId }: CreateSymptomDto,
  ) {
    return this.symptomService.createSymptom(name, severityScaleId);
  }

  @Put('/:id')
  public async updateSymptom(
    @Param('id') id: string,
    @Body() { name, severityScaleId }: UpdateSymptomDto,
  ) {
    return this.symptomService.updateSymptom(id, name, severityScaleId);
  }

  @Delete(':id')
  public async deleteSymptomById(@Param('id') id: string) {
    return this.symptomService.deleteSymptomById(id);
  }
}
