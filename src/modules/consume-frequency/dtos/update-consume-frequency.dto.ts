import { IsDefined, IsString } from 'class-validator';

export class CreateConsumeFrequencyDto {
  @IsDefined()
  @IsString()
  frequency: string;
}
