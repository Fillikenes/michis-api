import { Test, TestingModule } from '@nestjs/testing';
import { SeverityScaleService } from './severity-scale.service';

describe('SeverityScaleService', () => {
  let service: SeverityScaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeverityScaleService],
    }).compile();

    service = module.get<SeverityScaleService>(SeverityScaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
