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
import { RiskLevelService } from './risk-level.service';
import { CreateRiskLevelDto, UpdateRiskLevelDto } from './dtos';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

@Controller('risk-level')
@UseInterceptors(TransformInterceptor)
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Get()
  public async getRiskLevels() {
    return this.riskLevelService.getRiskLevels();
  }

  @Get('/:id')
  public async getRiskLevel(@Param('id') id: string) {
    return this.riskLevelService.getRiskLevelById(id);
  }

  @Post()
  public async createRiskLevel(@Body() { name }: CreateRiskLevelDto) {
    return this.riskLevelService.createRiskLevel(name);
  }

  @Put('/:id')
  public async updateRiskLevel(
    @Param('id') id: string,
    @Body() { name }: UpdateRiskLevelDto,
  ) {
    return this.riskLevelService.updateRiskLevel(id, name);
  }

  @Delete('/:id')
  public async deleteRiskLevel(@Param('id') id: string) {
    return this.riskLevelService.deleteRiskLevelById(id);
  }
}
