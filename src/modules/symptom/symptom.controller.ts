import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  public async createSymptom(@Body() params: CreateSymptomDto) {
    return this.symptomService.createSymptom(params);
  }

  @Put('/:id')
  public async updateSymptom(
    @Param('id') id: string,
    @Body() params: UpdateSymptomDto,
  ) {
    return this.symptomService.updateSymptom(id, params);
  }

  @Delete(':id')
  public async deleteSymptomById(@Param('id') id: string) {
    return this.symptomService.deleteSymptomById(id);
  }
}
