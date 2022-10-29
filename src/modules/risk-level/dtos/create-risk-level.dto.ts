import { IsDefined, IsString } from 'class-validator';

export class CreateRiskLevelDto {
  @IsDefined()
  @IsString()
  name: string;
}
