import { Test, TestingModule } from '@nestjs/testing';
import { Edible } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: PrismaService,
          useValue: {
            food: {
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getFoods', () => {
    it('should return all foods from db', async () => {
      const expectedResponse = [
        {
          id: 'abc123',
          name: 'Comida',
          description: 'Comida bien rikolina',
          suggestions: ['Cierra los ojos y pa entro'],
          symptomsIds: ['symptomid'],
          categoryId: 'categoryid',
          riskLevelId: 'risklevelid',
          consumeFrequencyId: 'consumefrequencyid',
          isEdible: Edible.YES,
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.food, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getFoods();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getFoodById', () => {
    it('should return a specific food from db by id given as argument', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'Comida',
        description: 'Comida bien rikolina',
        suggestions: ['Cierra los ojos y pa entro'],
        symptomsIds: ['symptomid'],
        categoryId: 'categoryid',
        riskLevelId: 'risklevelid',
        consumeFrequencyId: 'consumefrequencyid',
        isEdible: Edible.YES,
      };

      const findFirstSpy = jest
        .spyOn(prismaService.food, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();
      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { id: params.id },
        include: {
          consumeFrequency: true,
          category: true,
          riskLevel: true,
          symptoms: true,
        },
      });
    });
  });

  describe('#createFood', () => {
    it('should create a new food in the db based in the properties given as arguments', async () => {
      const params = {
        name: 'food',
        description: 'description',
        symptomsIds: [''],
        consumeFrequencyId: 'consumefrequencyid',
        categoryId: 'categoryid',
        riskLevelId: 'risklevelid',
        isEdible: Edible.NO,
      };
      const expectedResponse = {
        id: '123abc',
        name: 'Comida',
        description: 'Comida bien rikolina',
        suggestions: ['Cierra los ojos y pa entro'],
        symptomsIds: ['symptomid'],
        categoryId: 'categoryid',
        riskLevelId: 'risklevelid',
        consumeFrequencyId: 'consumefrequencyid',
        isEdible: Edible.YES,
      };
      const createSpy = jest
        .spyOn(prismaService.food, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.create(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        data: params,
      });
    });
  });

  describe('#deleteFoodById', () => {
    it('should delete a specific food from db by id given as argument', async () => {
      const params = { id: 'abc123' };
      const expectedResponse = {
        id: params.id,
        name: 'Comida',
        description: 'Comida bien rikolina',
        suggestions: ['Cierra los ojos y pa entro'],
        symptomsIds: ['symptomid'],
        categoryId: 'categoryid',
        riskLevelId: 'risklevelid',
        consumeFrequencyId: 'consumefrequencyid',
        isEdible: Edible.YES,
      };

      const deleteSpy = jest
        .spyOn(prismaService.food, 'delete')
        .mockResolvedValue(expectedResponse);

      const result = await service.deleteById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });
});
