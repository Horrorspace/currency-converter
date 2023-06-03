import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConfigEntity } from '../entities/api-config.entity';

/**
 * API configuration service
 */
@Injectable()
export class ApiConfigService implements ApiConfigEntity {
  constructor(
    /**
     * Instance of NestJS configuration service
     */
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  get host(): ApiConfigEntity['host'] {
    return this.configService.getOrThrow('api.host');
  }

  get port(): ApiConfigEntity['port'] {
    return this.configService.getOrThrow('api.port');
  }
}
