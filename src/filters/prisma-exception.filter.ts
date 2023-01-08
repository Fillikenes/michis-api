import { Prisma } from '@prisma/client';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * Error HTTP Status Codes Mapping
 *
 * Error codes definition for Prisma Client (Query Engine)
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
enum EPrismaErrorHttpStatusCode {
  /** The provided value for the column is too long for the column's type. Column: {column_name} */
  P2000 = HttpStatus.BAD_REQUEST,
  /** The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist */
  P2001 = HttpStatus.CONFLICT,
  /** Unique constraint failed on the {constraint} */
  P2002 = HttpStatus.CONFLICT,
  /** Foreign key constraint failed on the field: {field_name} */
  P2003 = HttpStatus.CONFLICT,
  /** A constraint failed on the database: {database_error} */
  P2004 = HttpStatus.CONFLICT,
  /** The value {field_value} stored in the database for the field {field_name} is invalid for the field's type */
  P2005 = HttpStatus.CONFLICT,
  /** The provided value {field_value} for {model_name} field {field_name} is not valid */
  P2006 = HttpStatus.CONFLICT,
  /** Data validation error {database_error} */
  P2007 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Failed to parse the query {query_parsing_error} at {query_position} */
  P2008 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Failed to validate the query: {query_validation_error} at {query_position} */
  P2009 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Raw query failed. Code: {code}. Message: {message} */
  P2010 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Null constraint violation on the {constraint} */
  P2011 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Missing a required value at {path} */
  P2012 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Missing the required argument {argument_name} for field {field_name} on {object_name} */
  P2013 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models */
  P2014 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** A related record could not be found. {details} */
  P2015 = HttpStatus.NOT_FOUND,
  /** Query interpretation error. {details} */
  P2016 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected */
  P2017 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** The required connected records were not found. {details} */
  P2018 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Input error. {details} */
  P2019 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Value out of range for the type. {details} */
  P2020 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** The table {table} does not exist in the current database */
  P2021 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** The column {column} does not exist in the current database */
  P2022 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Inconsistent column data: {message} */
  P2023 = HttpStatus.CONFLICT,
  /** Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit}) */
  P2024 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** An operation failed because it depends on one or more records that were required but not found. {cause} */
  P2025 = HttpStatus.NOT_FOUND,
  /** The current database provider doesn't support a feature that the query used: {feature} */
  P2026 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Multiple errors occurred on the database during query execution: {errors} */
  P2027 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Transaction API error: {error} */
  P2028 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema */
  P2030 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set */
  P2031 = HttpStatus.CONFLICT,
  /** A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers */
  /** Transaction failed due to a write conflict or a deadlock. Please retry your transaction */
  P2033 = HttpStatus.INTERNAL_SERVER_ERROR,
  /** Transaction failed due to a write conflict or a deadlock. Please retry your transaction */
  P2034 = HttpStatus.INTERNAL_SERVER_ERROR,
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = EPrismaErrorHttpStatusCode[exception.code];

    if (!statusCode || statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      return super.catch(exception, host);
    }

    const message =
      `[${exception.code}]: ` +
      this._generateValidExceptionMessage(exception.message);
    super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }

  private _generateValidExceptionMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));
    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
