import { Test, TestingModule } from '@nestjs/testing';
import { RiskLevelController } from './risk-level.controller';

describe('RiskLevelController', () => {
  let controller: RiskLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskLevelController],
    }).compile();

    controller = module.get<RiskLevelController>(RiskLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
