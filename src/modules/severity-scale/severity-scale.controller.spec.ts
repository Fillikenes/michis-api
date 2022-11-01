import { Test, TestingModule } from '@nestjs/testing';
import { SeverityScaleController } from './severity-scale.controller';
import { SeverityScaleService } from './severity-scale.service';

describe('SeverityScaleController', () => {
  let controller: SeverityScaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeverityScaleController],
      providers: [SeverityScaleService],
    }).compile();

    controller = module.get<SeverityScaleController>(SeverityScaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
