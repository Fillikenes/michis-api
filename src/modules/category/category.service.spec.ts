import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: {
            category: {
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

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getCategories', () => {
    it('should return all categories from db', async () => {
      const expectedResponse = [
        {
          id: 'abcde',
          name: 'category test',
        },
      ];
      const findManySpy = jest
        .spyOn(prismaService.category, 'findMany')
        .mockResolvedValue(expectedResponse);

      const result = await service.getCategories();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('#getCategoryById', () => {
    it('should return a specific category from db by id given as argument', async () => {
      const params = { id: 'bc123' };
      const expectedResponse = { id: params.id, name: 'Categorty test' };

      const findFirstSpy = jest
        .spyOn(prismaService.category, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await service.getCategoryById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(findFirstSpy).toHaveBeenCalled();

      /// OPCION 1
      expect(findFirstSpy).toHaveBeenCalledWith({ where: { id: params.id } });

      /// OPCION 2
      const [firstArgument] = findFirstSpy.mock.lastCall;
      expect(firstArgument).toEqual({ where: { id: params.id } });
      expect(firstArgument).toHaveProperty('where', { id: params.id });
    });
  });

  describe('#createCategory', () => {
    it('should create a new category in the db based in the properties given as arguments', async () => {
      const params = { name: 'New category' };
      const expectedResponse = { id: '1234', name: params.name };
      const createSpy = jest
        .spyOn(prismaService.category, 'create')
        .mockResolvedValue(expectedResponse);

      const result = await service.createCategory(params.name);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({ data: { name: params.name } });
    });
  });

  describe('#updateCategory', () => {
    it('should update the properties of a category from db', async () => {
      const params = { id: 'abc123', name: 'Updated Category' };
      const expectedResponse = { id: params.id, name: params.name };
      const updateSpy = jest
        .spyOn(prismaService.category, 'update')
        .mockResolvedValue(expectedResponse);

      const result = await service.updateCategory(params.id, params.name);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toBeCalledWith({
        where: { id: params.id },
        data: { name: params.name },
      });
    });
  });

  describe('#deleteCategoryById', () => {
    it('should delete a specific category from db by id given as argument', async () => {
      const params = { id: 'bc123' };
      const expectedResponse = { id: params.id, name: 'Categorty Deleted' };

      const deleteSpy = jest
        .spyOn(prismaService.category, 'delete')
        .mockResolvedValue(expectedResponse);

      const result = await service.deleteCategoryById(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: params.id } });
    });
  });
});
