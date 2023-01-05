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
import { ConsumeFrequencyService } from './consume-frequency.service';
import { CreateConsumeFrequencyDto, UpdateConsumeFrequencyDto } from './dtos';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

@Controller('consume-frequency')
@UseInterceptors(TransformInterceptor)
export class ConsumeFrequencyController {
  constructor(
    private readonly consumeFrequencyService: ConsumeFrequencyService,
  ) {}

  @Get()
  public async getConsumeFrequencies() {
    return this.consumeFrequencyService.getConsumeFrequencies();
  }

  @Get('/:id')
  public async getConsumeFrequency(@Param('id') id: string) {
    return this.consumeFrequencyService.getConsumeFrequencyById(id);
  }

  @Post()
  public async createConsumeFrequency(
    @Body() { frequency }: CreateConsumeFrequencyDto,
  ) {
    return this.consumeFrequencyService.createConsumeFrequency(frequency);
  }

  @Put('/:id')
  public async updateConsumeFrequency(
    @Param('id') id: string,
    @Body() { frequency }: UpdateConsumeFrequencyDto,
  ) {
    return this.consumeFrequencyService.updateConsumeFrequency(id, frequency);
  }

  @Delete('/:id')
  public async deleteConsumeFrequency(@Param('id') id: string) {
    return this.consumeFrequencyService.deleteConsumeFrequencyById(id);
  }
}
