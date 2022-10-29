import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getCategories: jest.fn(),
            getCategoryById: jest.fn(),
            createCategory: jest.fn(),
            updateCategory: jest.fn(),
            deleteCategoryById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getCategories', () => {
    it('should return all categories from db', async () => {
      const expectedResponse = [
        {
          id: '123',
          name: 'Category 123',
        },
      ];
      const getCategoriesSpy = jest
        .spyOn(categoryService, 'getCategories')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getCategories();

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getCategoriesSpy).toHaveBeenCalled();
    });
  });

  describe('#getCategory', () => {
    it('should get a specific category from db based in the argument given', async () => {
      const params = { id: '12345' };
      const expectedResponse = { id: params.id, name: 'Category test' };
      const getCategoryByIdSpy = jest
        .spyOn(categoryService, 'getCategoryById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getCategory(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getCategoryByIdSpy).toHaveBeenCalled();
      expect(getCategoryByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });

  describe('#createCategory', () => {
    it('should create a new category in the db', async () => {
      const params = { name: 'New Category' } as CreateCategoryDto;
      const expectedResponse = { id: '123', name: params.name };
      const createCategorySpy = jest
        .spyOn(categoryService, 'createCategory')
        .mockResolvedValue(expectedResponse);

      const result = await controller.createCategory(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(createCategorySpy).toHaveBeenCalled();
      expect(createCategorySpy).toHaveBeenCalledWith(params.name);
    });
  });

  describe('#updateCategory', () => {
    it('should update a category from db based in the id given as argument', async () => {
      const paramId = '1234';
      const paramsBody = { name: 'Updated Category Name' } as UpdateCategoryDto;
      const expectedResponse = { id: paramId, name: paramsBody.name };
      const updateCategorySpy = jest
        .spyOn(categoryService, 'updateCategory')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateCategory(paramId, paramsBody);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(updateCategorySpy).toHaveBeenCalled();
      expect(updateCategorySpy).toHaveBeenCalledWith(paramId, paramsBody.name);
    });
  });

  describe('#deleteCategory', () => {
    it('should delete a specific category from db based in the argument given', async () => {
      const params = { id: '12345' };
      const expectedResponse = { id: params.id, name: 'Category deleted' };
      const deleteCategoryByIdSpy = jest
        .spyOn(categoryService, 'deleteCategoryById')
        .mockResolvedValue(expectedResponse);

      const result = await controller.deleteCategory(params.id);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(deleteCategoryByIdSpy).toHaveBeenCalled();
      expect(deleteCategoryByIdSpy).toHaveBeenCalledWith(params.id);
    });
  });
});
