import { Test, TestingModule } from '@nestjs/testing';
import { SymptomService } from './symptom.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { SeverityScaleService } from '../severity-scale/severity-scale.service';

describe('SymptomService', () => {
  let service: SymptomService;
  let prismaService: PrismaService;
  let severityScaleService: SeverityScaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SymptomService,
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
        {
          provide: SeverityScaleService,
          useValue: {
            severityScaleService: {
              getSeverityScaleById: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SymptomService>(SymptomService);
    prismaService = module.get<PrismaService>(PrismaService);
    severityScaleService =
      module.get<SeverityScaleService>(SeverityScaleService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getSymptoms', () => {
    it('should return all symptoms scale from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'symptom',
          severityScaleId: 'severity scale id',
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.symptom, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getSymptoms();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getSymptomById', () => {
    it('should return a specific symptom from db by id given as argument', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'symptom',
        severityScaleId: 'severity scale id',
      };

      const findFirstSpy = jest
        .spyOn(prismaService.symptom, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getSymptomById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();
      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { id: params.id },
        include: { severityScale: true },
      });
    });
  });

  describe('#createSymptom', () => {
    it('should create a new symptom in the db based in the properties given as arguments', async () => {
      const params = {
        name: 'symptom',
        severityScaleId: 'severity scale id',
      };
      const expectedResponse = {
        id: '123abc',
        name: params.name,
        severityScaleId: params.severityScaleId,
      };
      const createSpy = jest
        .spyOn(prismaService.symptom, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.createSymptom(
        params.name,
        params.severityScaleId,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        data: {
          name: params.name,
          severityScaleId: params.severityScaleId,
        },
      });
    });
  });
});
