import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeFrequencyController } from './consume-frequency.controller';

describe('ConsumeFrequencyController', () => {
  let controller: ConsumeFrequencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumeFrequencyController],
    }).compile();

    controller = module.get<ConsumeFrequencyController>(
      ConsumeFrequencyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
