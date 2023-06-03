import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigEntity } from '../entities/app-config.entity';

/**
 * Application configuration service
 */
@Injectable()
export class AppConfigService implements AppConfigEntity {
  constructor(
    /**
     * Instance of NestJS configuration service
     */
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  get mode(): AppConfigEntity['mode'] {
    return this.configService.getOrThrow('app.mode');
  }
}
