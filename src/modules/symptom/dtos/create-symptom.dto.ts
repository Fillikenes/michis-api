import { IsDefined, IsString } from 'class-validator';
import { ICreateSymptomParams } from '../params';

export class CreateSymptomDto implements ICreateSymptomParams {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  severityScaleId: string;
}
