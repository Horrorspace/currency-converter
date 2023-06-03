import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThbApiConfigEntity } from '../entities/thb-api-config.entity';

/**
 * THB API configuration service
 */
@Injectable()
export class ThbApiConfigService implements ThbApiConfigEntity {
  constructor(
    /**
     * Instance of NestJS configuration service
     */
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  get key(): ThbApiConfigEntity['key'] {
    return this.configService.getOrThrow('thbApi.key');
  }

  get url(): ThbApiConfigEntity['url'] {
    return this.configService.getOrThrow('thbApi.url');
  }
}
