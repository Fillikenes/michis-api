import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeFrequencyController } from './consume-frequency.controller';
import { ConsumeFrequencyService } from './consume-frequency.service';
import { CreateConsumeFrequencyDto, UpdateConsumeFrequencyDto } from './dtos';

describe('ConsumeFrequencyController', () => {
  let controller: ConsumeFrequencyController;
  let consumeFrequencyService: ConsumeFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumeFrequencyController],
      providers: [
        {
          provide: ConsumeFrequencyService,
          useValue: {
            getConsumeFrequencies: jest.fn(),
            getConsumeFrequencyById: jest.fn(),
            createConsumeFrequency: jest.fn(),
            updateConsumeFrequency: jest.fn(),
            deleteConsumeFrequencyById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsumeFrequencyController>(
      ConsumeFrequencyController,
    );
    consumeFrequencyService = module.get<ConsumeFrequencyService>(
      ConsumeFrequencyService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getConsumeFrequencies', () => {
    it('should return all consume frequencies from db', async () => {
      const expectedResponse = [
        {
          id: '1',
          frequency: 'Frequency 1',
        },
      ];
      const getConsumeFrequenciesSpy = jest
        .spyOn(consumeFrequencyService, 'getConsumeFrequencies')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getConsumeFrequencies();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getConsumeFrequenciesSpy).toHaveBeenCalled();
    });
  });

  describe('#getConsumeFrequency', () => {
    it('should get a specific consume frequency from db based in the argument given', async () => {
      const params = { id: '123' };
      const expectedResponse = {
        id: params.id,
        frequency: 'Frequency 123',
      };
      const getConsumeFrequencyByIdSpy = jest
        .spyOn(consumeFrequencyService, 'getConsumeFrequencyById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getConsumeFrequency(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getConsumeFrequencyByIdSpy).toHaveBeenCalled();
      expect(getConsumeFrequencyByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });

  describe('#createConsumeFrequency', () => {
    it('should create a new consume frequency in the db', async () => {
      const params = {
        frequency: 'New Frequency',
      } as CreateConsumeFrequencyDto;
      const expectedResponse = { id: '123456', frequency: params.frequency };
      const createConsumeFrequencySpy = jest
        .spyOn(consumeFrequencyService, 'createConsumeFrequency')
        .mockResolvedValue(expectedResponse);

      const result = await controller.createConsumeFrequency(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createConsumeFrequencySpy).toHaveBeenCalled();
      expect(createConsumeFrequencySpy).toHaveBeenCalledWith(params.frequency);
    });
  });

  describe('#updateConsumeFrequency', () => {
    it('should update a consume frequency from db based in the id given as argument', async () => {
      const paramId = 'abc789';
      const paramsBody = {
        frequency: 'Updated Frequency',
      } as UpdateConsumeFrequencyDto;
      const expectedResponse = { id: paramId, frequency: paramsBody.frequency };
      const updateConsumeFrequencySpy = jest
        .spyOn(consumeFrequencyService, 'updateConsumeFrequency')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateConsumeFrequency(
        paramId,
        paramsBody,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateConsumeFrequencySpy).toHaveBeenCalled();
      expect(updateConsumeFrequencySpy).toHaveBeenCalledWith(
        paramId,
        paramsBody.frequency,
      );
    });
  });

  describe('#deleteConsumeFrequency', () => {
    it('should delete a specific consume frequency from db based in the argument given', async () => {
      const params = { id: '12gg34gg' };
      const expectedResponse = {
        id: params.id,
        frequency: 'Frequency deleted',
      };
      const deleteConsumeFrequencyByIdSpy = jest
        .spyOn(consumeFrequencyService, 'deleteConsumeFrequencyById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.deleteConsumeFrequency(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteConsumeFrequencyByIdSpy).toHaveBeenCalled();
      expect(deleteConsumeFrequencyByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });
});
