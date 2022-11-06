import { PartialType } from '@nestjs/mapped-types';
import { CreateSeverityScaleDto } from './index';

export class UpdateSeverityScaleDto extends PartialType(
  CreateSeverityScaleDto,
) {}
