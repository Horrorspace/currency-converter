import { Controller as BaseController, applyDecorators, UsePipes } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ValidationPipe } from '../validation/validation.pipe';
import { apiRoutes } from '../../shared/common/api-routes';

/**
 * Class decorator which encapsulates common controllers decorators
 * @param path Basic path of API controller
 */
export function Controller(path: apiRoutes) {
  return applyDecorators(
    BaseController({
      path,
    }),
    UsePipes(new ValidationPipe()),
    ApiTags(path),
    ApiBadRequestResponse({
      description: 'Wrong requst parameters',
    }),
    ApiInternalServerErrorResponse({
      description: 'Server error',
    }),
  );
}
