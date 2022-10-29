import { IsDefined, IsString } from 'class-validator';

export class UpdateRiskLevelDto {
  @IsDefined()
  @IsString()
  name: string;
}
