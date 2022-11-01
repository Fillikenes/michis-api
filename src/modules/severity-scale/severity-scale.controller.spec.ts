import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSeverityScaleDto } from './dtos';
import { SeverityScaleController } from './severity-scale.controller';
import { SeverityScaleService } from './severity-scale.service';

describe('SeverityScaleController', () => {
  let controller: SeverityScaleController;
  let severityScaleService: SeverityScaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeverityScaleController],
      providers: [
        {
          provide: SeverityScaleService,
          useValue: {
            getSeveritiesScale: jest.fn(),
            getSeverityScaleById: jest.fn(),
            createSeverityScale: jest.fn(),
            updateSeverityScale: jest.fn(),
            deleteSeverityScaleById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SeverityScaleController>(SeverityScaleController);
    severityScaleService =
      module.get<SeverityScaleService>(SeverityScaleService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getSeveritiesScale', () => {
    it('should return all severities from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'minimal',
          description: 'minimal description',
          icon: 'minimal icon',
        },
      ];
      const getSeveritiesScaleSpy = jest
        .spyOn(severityScaleService, 'getSeveritiesScale')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getSeveritiesScale();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getSeveritiesScaleSpy).toHaveBeenCalled();
    });
  });

  describe('#getSeverityScaleById', () => {
    it('should get a specific severity from db based in the argument given', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'minimal',
        description: 'minimal description',
        icon: 'minimal icon',
      };
      const getSeverityScaleByIdSpy = jest
        .spyOn(severityScaleService, 'getSeverityScaleById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getSeverityScaleById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getSeverityScaleByIdSpy).toHaveBeenCalled();
      expect(getSeverityScaleByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });

  describe('#createSeverityScale', () => {
    it('should create a new severity in the db', async () => {
      const params = {
        name: 'moderate',
        description: 'moderate description',
        icon: 'moderate icon',
      };
      const expectedResponse = {
        id: '123abc',
        name: params.name,
        description: params.description,
        icon: params.icon,
      };
      const createSeverityScaleSpy = jest
        .spyOn(severityScaleService, 'createSeverityScale')
        .mockResolvedValue(expectedResponse);

      const result = await controller.createSeverityScale(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSeverityScaleSpy).toHaveBeenCalled();
      expect(createSeverityScaleSpy).toHaveBeenCalledWith(
        params.name,
        params.description,
        params.icon,
      );
    });
  });

  describe('#updateSeverityScale', () => {
    it('should update a severity from db based in the id given as argument', async () => {
      const paramId = '123abc';
      const paramsBody = {
        name: 'moderate',
        description: 'moderate description updated',
        icon: 'moderate icon updated',
      } as UpdateSeverityScaleDto;
      const expectedResponse = {
        id: paramId,
        name: paramsBody.name,
        description: paramsBody.description,
        icon: paramsBody.icon,
      };
      const updateSeverityScaleSpy = jest
        .spyOn(severityScaleService, 'updateSeverityScale')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateSeverityScale(paramId, paramsBody);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSeverityScaleSpy).toHaveBeenCalled();
      expect(updateSeverityScaleSpy).toHaveBeenCalledWith(
        paramId,
        paramsBody.name,
        paramsBody.description,
        paramsBody.icon,
      );
    });
  });

  describe('#deleteSeverityScale', () => {
    it('should delete a specific severity from db based in the argument given', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'minimal deleted',
        description: 'minimal description',
        icon: 'minimal icon',
      };
      const deleteSeverityScaleByIdSpy = jest
        .spyOn(severityScaleService, 'deleteSeverityScaleById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.deleteSeverityScaleById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSeverityScaleByIdSpy).toHaveBeenCalled();
      expect(deleteSeverityScaleByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });
});
