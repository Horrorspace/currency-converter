import { BadRequestException } from './exceptions/bad-request.exception';
import { ConflictException } from './exceptions/conflict.exception';
import { NotFoundException } from './exceptions/not-found.exception';
import { ServerErrorException } from './exceptions/server-error.exception';

/**
 * Handles error and returns error without any changes,
 * if passed error is custom exception, otherwise returns server
 * error exception
 * @param e Error which is need to be handled
 */
export function handleError(e: unknown) {
  const isCustomErr =
    e instanceof BadRequestException ||
    e instanceof ConflictException ||
    e instanceof NotFoundException ||
    e instanceof ServerErrorException;

  if (isCustomErr) {
    return e;
  }

  return new ServerErrorException();
}
