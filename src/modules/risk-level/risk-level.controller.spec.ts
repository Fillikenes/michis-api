import { Test, TestingModule } from '@nestjs/testing';
import { RiskLevelService } from './risk-level.service';
import { RiskLevelController } from './risk-level.controller';
import { CreateRiskLevelDto, UpdateRiskLevelDto } from './dtos';

describe('RiskLevelController', () => {
  let controller: RiskLevelController;
  let riskLevelService: RiskLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskLevelController],
      providers: [
        {
          provide: RiskLevelService,
          useValue: {
            getRiskLevels: jest.fn(),
            getRiskLevelById: jest.fn(),
            createRiskLevel: jest.fn(),
            updateRiskLevel: jest.fn(),
            deleteRiskLevelById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RiskLevelController>(RiskLevelController);
    riskLevelService = module.get<RiskLevelService>(RiskLevelService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getRiskLevels', () => {
    it('should return all risk level from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'RiskLevel 123',
        },
      ];
      const getRiskLevelsSpy = jest
        .spyOn(riskLevelService, 'getRiskLevels')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getRiskLevels();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getRiskLevelsSpy).toHaveBeenCalled();
    });
  });

  describe('#getRiskLevel', () => {
    it('should get a specific risk level from db based in the argument given', async () => {
      const params = { id: 'abcdfef' };
      const expectedResponse = { id: params.id, name: 'Risk Level Test 123' };
      const getRiskLevelByIdSpy = jest
        .spyOn(riskLevelService, 'getRiskLevelById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getRiskLevel(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getRiskLevelByIdSpy).toHaveBeenCalled();
      expect(getRiskLevelByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });

  describe('#createRiskLevel', () => {
    it('should create a new risk level in the db', async () => {
      const params = { name: 'New Risk Level' } as CreateRiskLevelDto;
      const expectedResponse = { id: 'a123b45', name: params.name };
      const createRiskLevelSpy = jest
        .spyOn(riskLevelService, 'createRiskLevel')
        .mockResolvedValue(expectedResponse);

      const result = await controller.createRiskLevel(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createRiskLevelSpy).toHaveBeenCalled();
      expect(createRiskLevelSpy).toHaveBeenCalledWith(params.name);
    });
  });

  describe('#updateRiskLevel', () => {
    it('should update a risk level from db based in the id given as argument', async () => {
      const paramId = 'abc789';
      const paramsBody = { name: 'Updated Risk Level' } as UpdateRiskLevelDto;
      const expectedResponse = { id: paramId, name: paramsBody.name };
      const updateRiskLevelSpy = jest
        .spyOn(riskLevelService, 'updateRiskLevel')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateRiskLevel(paramId, paramsBody);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateRiskLevelSpy).toHaveBeenCalled();
      expect(updateRiskLevelSpy).toHaveBeenCalledWith(paramId, paramsBody.name);
    });
  });

  describe('#deleteRiskLevel', () => {
    it('should delete a specific risk level from db based in the argument given', async () => {
      const params = { id: '12cd3fg45' };
      const expectedResponse = { id: params.id, name: 'Risk Level deleted' };
      const deleteRiskLevelByIdSpy = jest
        .spyOn(riskLevelService, 'deleteRiskLevelById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.deleteRiskLevel(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteRiskLevelByIdSpy).toHaveBeenCalled();
      expect(deleteRiskLevelByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });
});
