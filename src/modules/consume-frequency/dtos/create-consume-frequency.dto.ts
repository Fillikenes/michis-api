import { IsDefined, IsString } from 'class-validator';

export class UpdateConsumeFrequencyDto {
  @IsDefined()
  @IsString()
  frequency: string;
}
