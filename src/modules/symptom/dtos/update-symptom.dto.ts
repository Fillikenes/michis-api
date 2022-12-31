import { PartialType } from '@nestjs/mapped-types';
import { CreateSymptomDto } from './index';

export class UpdateSymptomDto extends PartialType(CreateSymptomDto) {}
