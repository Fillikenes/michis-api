import { BaseExceptionFilter } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientExceptionFilter } from './prisma-exception.filter';

describe('Prisma Exception', () => {
  let exceptionFilter: PrismaClientExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientExceptionFilter],
    }).compile();

    exceptionFilter = module.get<PrismaClientExceptionFilter>(
      PrismaClientExceptionFilter,
    );
  });

  it('should be defined', () => {
    expect(exceptionFilter).toBeDefined();
  });

  afterEach(() => jest.clearAllMocks());

  describe('#catch - prisma engine exception', () => {
    let catchSpy: jest.SpyInstance;
    const hostParam = {
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    };

    beforeEach(() => {
      catchSpy = jest.spyOn(BaseExceptionFilter.prototype, 'catch');
    });

    describe('Valid Cases', () => {
      const validCases: { title: string; params: any; expected: any }[] = [
        {
          title: 'NOT VALID CREATE CONSTRAINT',
          params: {
            code: 'P2002',
            clientVersion: '4.5.0',
            meta: {
              target: 'Category_name_key',
            },
            message:
              '\nInvalid `this.prismaService.category.create()` invocation in\nlocalhost\n\n  15 }\n  16 \n  17 public async createCategory(name: string): Promise<Category> {\n→ 18   return this.prismaService.category.create(\nUnique constraint failed on the constraint: `Category_name_key`',
          },
          expected: {
            statusCode: 409,
            message:
              '[P2002]: Unique constraint failed on the constraint: `Category_name_key`',
          },
        },
        {
          title: 'TRY TO DELETE AN NON-EXISTENT',
          params: {
            code: 'P2025',
            clientVersion: '4.5.0',
            meta: {
              cause: 'Record to delete does not exist.',
            },
            message:
              '\nInvalid `this.prismaService.category.delete()` invocation in\nlocalhost\n\n  30 }\n  31 \n  32 public async deleteCategoryById(id: string): Promise<Category> {\n→ 33   return this.prismaService.category.delete(\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
          },
          expected: {
            statusCode: 404,
            message:
              '[P2025]: An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
          },
        },
      ];

      const _validateFilterResponse = (expectedResponse) => {
        catchSpy.mockImplementation((args, host) => {
          expect(host).toEqual(hostParam);
          expect(args).toBeDefined();
          expect(args).toHaveProperty('response');
          expect(args.response).toMatchObject(expectedResponse);
        });
      };

      it.each(validCases)('CASE: $title', ({ title, params, expected }) => {
        _validateFilterResponse(expected);

        exceptionFilter.catch(params, hostParam);
      });
    });

    describe('Invalid Cases', () => {
      const invalidCases: { title: string; params: any }[] = [
        {
          title: 'PRISMA ERROR MAP TO INTERNAL ERROR CODE',
          params: {
            code: 'P2028',
            clientVersion: '4.5.0',
            meta: {
              message:
                'Malformed ObjectID: provided hex string representation must be exactly 12 bytes, instead got: "6358a8a8dd6724c536825ca921", length 26.',
            },
            message:
              '\nInvalid `this.prismaService.category.findFirst()` invocation in\nlocalhost\n\n  11 }\n  12 \n  13 public async getCategoryById(id: string): Promise<Category> {\n→ 14   return this.prismaService.category.findFirst(\nInconsistent column data: Malformed ObjectID: provided hex string representation must be exactly 12 bytes, instead got: "6358a8a8dd6724c536825ca921", length 26.',
          },
        },
        {
          title: 'NOT A PRISMA ERROR',
          params: {
            code: 'NOT_VALID_CODE_PRISMA',
          },
        },
      ];

      const _validateFilterResponse = (params) => {
        catchSpy.mockImplementation((args, host) => {
          expect(host).toEqual(hostParam);
          expect(args).toBeDefined();
          expect(args).toMatchObject(params);
        });
      };

      it.each(invalidCases)('CASE: $title', ({ title, params }) => {
        _validateFilterResponse(params);
        exceptionFilter.catch(params, hostParam);
      });
    });
  });
});
