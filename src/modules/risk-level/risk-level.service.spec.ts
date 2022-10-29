import { Test, TestingModule } from '@nestjs/testing';
import { RiskLevelService } from './risk-level.service';

describe('RiskLevelService', () => {
  let service: RiskLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskLevelService],
    }).compile();

    service = module.get<RiskLevelService>(RiskLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
