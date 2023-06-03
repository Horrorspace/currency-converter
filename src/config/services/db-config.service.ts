import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbConfigEntity } from '../entities/db-config.entity';

/**
 * Database configuration service
 */
@Injectable()
export class DbConfigService implements DbConfigEntity {
  constructor(
    /**
     * Instance of NestJS configuration service
     */
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  get url(): DbConfigEntity['url'] {
    return this.configService.getOrThrow('db.url');
  }
}
