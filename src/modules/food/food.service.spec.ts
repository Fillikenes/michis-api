import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from './food.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: PrismaService,
          useValue: {
            symptom: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
