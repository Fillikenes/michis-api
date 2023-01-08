import { Edible } from '@prisma/client';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICreateFoodParams } from '../params';

export class CreateFoodDto implements ICreateFoodParams {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  symptomsIds: string[];

  @IsOptional()
  @IsString()
  consumeFrequencyId?: string;

  @IsDefined()
  @IsString()
  categoryId: string;

  @IsDefined()
  @IsString()
  riskLevelId: string;

  @IsDefined()
  @IsEnum(Edible, {
    message: `isEdible must be a valid enum value: [${Object.keys(Edible)}]`,
  })
  isEdible: Edible;
}
