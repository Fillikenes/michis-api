import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeFrequencyService } from './consume-frequency.service';

describe('ConsumeFrequencyService', () => {
  let service: ConsumeFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumeFrequencyService],
    }).compile();

    service = module.get<ConsumeFrequencyService>(ConsumeFrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
