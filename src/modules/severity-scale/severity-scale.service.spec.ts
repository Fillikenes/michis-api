import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { SeverityScaleService } from './severity-scale.service';

describe('SeverityScaleService', () => {
  let service: SeverityScaleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeverityScaleService,
        {
          provide: PrismaService,
          useValue: {
            severityScale: {
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

    service = module.get<SeverityScaleService>(SeverityScaleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getSeveritiesScale', () => {
    it('should return all severities scale from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'minimal',
          description: 'minimal description',
          icon: 'minimal icon',
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.severityScale, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getSeveritiesScale();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getSeverityScaleById', () => {
    it('should return a specific severity from db by id given as argument', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'minimal',
        description: 'minimal description',
        icon: 'minimal icon',
      };

      const findFirstSpy = jest
        .spyOn(prismaService.severityScale, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getSeverityScaleById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();
      expect(findFirstSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });

  describe('#createSeverityScale', () => {
    it('should create a new severity scale in the db based in the properties given as arguments', async () => {
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
      const createSpy = jest
        .spyOn(prismaService.severityScale, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.createSeverityScale(
        params.name,
        params.description,
        params.icon,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        data: {
          name: params.name,
          description: params.description,
          icon: params.icon,
        },
      });
    });
  });

  describe('#updateSeverityScale', () => {
    it('should update the properties of a severity from db', async () => {
      const params = {
        id: '123abc',
        name: 'moderate',
        description: 'moderate description updated',
        icon: 'moderate icon updated',
      };
      const expectedResponse = {
        id: params.id,
        name: params.name,
        description: params.description,
        icon: params.icon,
      };
      const updateSpy = jest
        .spyOn(prismaService.severityScale, 'update')
        .mockResolvedValue(expectedResponse);

      const result = await service.updateSeverityScale(
        params.id,
        params.name,
        params.description,
        params.icon,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toBeCalledWith({
        where: { id: params.id },
        data: {
          name: params.name,
          description: params.description,
          icon: params.icon,
        },
      });
    });
  });

  describe('#deleteSeverityScaleById', () => {
    it('should delete a specific severity scale from db by id given as argument', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'minimal deleted',
        description: 'minimal description',
        icon: 'minimal icon',
      };
      const deleteSpy = jest
        .spyOn(prismaService.severityScale, 'delete')
        .mockResolvedValue(expectedResponse);

      const result = await service.deleteSeverityScaleById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });
});
