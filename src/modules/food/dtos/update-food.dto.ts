import { PartialType } from '@nestjs/mapped-types';
import { IUpdateFoodParams } from '../params';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto
  extends PartialType(CreateFoodDto)
  implements IUpdateFoodParams {}
