import { IsDefined, IsString } from 'class-validator';

export class CreateSeverityScaleDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsString()
  icon: string;
}
