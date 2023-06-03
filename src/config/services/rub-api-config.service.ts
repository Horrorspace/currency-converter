import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RubApiConfigEntity } from '../entities/rub-api-config.entity';

/**
 * RUB API configuration service
 */
@Injectable()
export class RubApiConfigService implements RubApiConfigEntity {
  constructor(
    /**
     * Instance of NestJS configuration service
     */
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  get url(): RubApiConfigEntity['url'] {
    return this.configService.getOrThrow('rubApi.url');
  }
}
