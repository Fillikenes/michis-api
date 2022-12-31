import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSymptomDto } from './dtos';
import { SymptomController } from './symptom.controller';
import { SymptomService } from './symptom.service';

describe('SymptomController', () => {
  let controller: SymptomController;
  let symptomService: SymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomController],
      providers: [
        {
          provide: SymptomService,
          useValue: {
            getSymptoms: jest.fn(),
            getSymptomById: jest.fn(),
            createSymptom: jest.fn(),
            updateSymptom: jest.fn(),
            deleteSymptomById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SymptomController>(SymptomController);
    symptomService = module.get<SymptomService>(SymptomService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getSymptoms', () => {
    it('should return all symptoms from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'symptom',
          severityScaleId: 'severity scale id',
        },
      ];
      const getSymptomsSpy = jest
        .spyOn(symptomService, 'getSymptoms')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getSymptoms();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getSymptomsSpy).toHaveBeenCalled();
    });
  });

  describe('#getSymptomById', () => {
    it('should get a specific symptom from db based in the argument given', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'symptom',
        severityScaleId: 'severity scale id',
      };
      const getSymptomByIdSpy = jest
        .spyOn(symptomService, 'getSymptomById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getSymptomById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getSymptomByIdSpy).toHaveBeenCalled();
      expect(getSymptomByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });

  describe('#createSymptom', () => {
    it('should create a new symptom in the db', async () => {
      const params = {
        name: 'symptom',
        severityScaleId: 'severity scale id',
      };
      const expectedResponse = {
        id: '123abc',
        name: params.name,
        severityScaleId: params.severityScaleId,
      };
      const createSymptomSpy = jest
        .spyOn(symptomService, 'createSymptom')
        .mockResolvedValue(expectedResponse);

      const result = await controller.createSymptom(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSymptomSpy).toHaveBeenCalled();
      expect(createSymptomSpy).toHaveBeenCalledWith(
        params.name,
        params.severityScaleId,
      );
    });
  });

  describe('#updateSymptom', () => {
    it('should update a symptom from db based in the id given as argument', async () => {
      const paramId = '123abc';
      const paramsBody = {
        name: 'symptom',
        severityScaleId: 'severity scale id',
      } as UpdateSymptomDto;
      const expectedResponse = {
        id: paramId,
        name: paramsBody.name,
        severityScaleId: paramsBody.severityScaleId,
      };
      const updateSeverityScaleSpy = jest
        .spyOn(symptomService, 'updateSymptom')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateSymptom(paramId, paramsBody);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSeverityScaleSpy).toHaveBeenCalled();
      expect(updateSeverityScaleSpy).toHaveBeenCalledWith(
        paramId,
        paramsBody.name,
        paramsBody.severityScaleId,
      );
    });
  });

  describe('#deleteSymptom', () => {
    it('should delete a specific symptom from db based in the argument given', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'symptom',
        severityScaleId: 'severity scale id',
      };
      const deleteSeverityScaleByIdSpy = jest
        .spyOn(symptomService, 'deleteSymptomById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.deleteSymptomById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSeverityScaleByIdSpy).toHaveBeenCalled();
      expect(deleteSeverityScaleByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });
});
