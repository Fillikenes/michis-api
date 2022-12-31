import { IsDefined, IsString } from 'class-validator';

export class CreateSymptomDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  severityScaleId: string;
}
