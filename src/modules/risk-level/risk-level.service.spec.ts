import { Test, TestingModule } from '@nestjs/testing';
import { RiskLevelService } from './risk-level.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

describe('RiskLevelService', () => {
  let service: RiskLevelService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiskLevelService,
        {
          provide: PrismaService,
          useValue: {
            riskLevel: {
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

    service = module.get<RiskLevelService>(RiskLevelService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getRiskLevels', () => {
    it('should return all risk levels from db', async () => {
      const expectedResponse = [
        {
          id: 'ab123e',
          name: 'Risk Level 1',
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.riskLevel, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getRiskLevels();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getRiskLevelById', () => {
    it('should return a specific risk level from db by id given as argument', async () => {
      const params = { id: '1bdc2' };
      const expectedResponse = { id: params.id, name: 'Risk Level 123' };

      const findFirstSpy = jest
        .spyOn(prismaService.riskLevel, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getRiskLevelById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();
      expect(findFirstSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });

  describe('#createRiskLevel', () => {
    it('should create a new risk level in the db based in the properties given as arguments', async () => {
      const params = { name: 'New Risk Level' };
      const expectedResponse = { id: '1a', name: params.name };
      const createSpy = jest
        .spyOn(prismaService.riskLevel, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.createRiskLevel(params.name);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({ data: { name: params.name } });
    });
  });

  describe('#updateRiskLevel', () => {
    it('should update the properties of a risk level from db', async () => {
      const params = { id: 'ad123', name: 'Updated Risk Level' };
      const expectedResponse = { id: params.id, name: params.name };
      const updateSpy = jest
        .spyOn(prismaService.riskLevel, 'update')
        .mockResolvedValue(expectedResponse);

      const result = await service.updateRiskLevel(params.id, params.name);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toBeCalledWith({
        where: { id: params.id },
        data: { name: params.name },
      });
    });
  });

  describe('#deleteRiskLevelById', () => {
    it('should delete a specific risk level from db by id given as argument', async () => {
      const params = { id: '1a2b3c' };
      const expectedResponse = { id: params.id, name: 'Risk Level Deleted' };

      const deleteSpy = jest
        .spyOn(prismaService.riskLevel, 'delete')
        .mockResolvedValue(expectedResponse);

      const result = await service.deleteRiskLevelById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });
});
