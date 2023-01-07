import { Edible } from '@prisma/client';

export interface ICreateFoodParams {
  name: string;
  description: string;
  symptomsIds: string[];
  consumeFrequencyId?: string;
  categoryId: string;
  riskLevelId: string;
  isEdible: Edible;
}
