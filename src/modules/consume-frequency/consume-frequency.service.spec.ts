import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { ConsumeFrequencyService } from './consume-frequency.service';

describe('ConsumeFrequencyService', () => {
  let service: ConsumeFrequencyService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumeFrequencyService,
        {
          provide: PrismaService,
          useValue: {
            consumeFrequency: {
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

    service = module.get<ConsumeFrequencyService>(ConsumeFrequencyService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getConsumeFrequencies', () => {
    it('should return all consumer frequencies from db', async () => {
      const expectedResponse = [
        {
          id: 'a12c3e',
          frequency: '1 per day',
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.consumeFrequency, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getConsumeFrequencies();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getConsumeFrequencyById', () => {
    it('should return a specific consume frequency from db by id given as argument', async () => {
      const params = { id: '1ab2' };
      const expectedResponse = { id: params.id, frequency: '2 per day' };

      const findFirstSpy = jest
        .spyOn(prismaService.consumeFrequency, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getConsumeFrequencyById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();
      expect(findFirstSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });

  describe('#createConsumeFrequency', () => {
    it('should create a new consume frequency in the db based in the properties given as arguments', async () => {
      const params = { frequency: 'New Frequency' };
      const expectedResponse = { id: '1a', frequency: params.frequency };
      const createSpy = jest
        .spyOn(prismaService.consumeFrequency, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.createConsumeFrequency(params.frequency);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        data: { frequency: params.frequency },
      });
    });
  });

  describe('#updateConsumeFrequency', () => {
    it('should update the properties of a consume frequency from db', async () => {
      const params = { id: '123', frequency: 'Updated Frequency' };
      const expectedResponse = { id: params.id, frequency: params.frequency };
      const updateSpy = jest
        .spyOn(prismaService.consumeFrequency, 'update')
        .mockResolvedValue(expectedResponse);

      const result = await service.updateConsumeFrequency(
        params.id,
        params.frequency,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toBeCalledWith({
        where: { id: params.id },
        data: { frequency: params.frequency },
      });
    });
  });

  describe('#deleteConsumeFrequencyById', () => {
    it('should delete a specific consume frequency from db by id given as argument', async () => {
      const params = { id: '1234' };
      const expectedResponse = {
        id: params.id,
        frequency: 'Consume Frequency Deleted',
      };
      const deleteSpy = jest
        .spyOn(prismaService.consumeFrequency, 'delete')
        .mockResolvedValue(expectedResponse);

      const result = await service.deleteConsumeFrequencyById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });
});
