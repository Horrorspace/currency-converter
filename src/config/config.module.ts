import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configuration } from './utils/configuration';
import { ApiConfigService } from './services/api-config.service';
import { AppConfigService } from './services/app-config.service';
import { DbConfigService } from './services/db-config.service';
import { RubApiConfigService } from './services/rub-api-config.service';
import { ThbApiConfigService } from './services/thb-api-config.service';

/**
 * Configuratiion module is responsible for work with application configuration
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [
    ApiConfigService,
    AppConfigService,
    DbConfigService,
    RubApiConfigService,
    ThbApiConfigService,
  ],
  exports: [
    ApiConfigService,
    AppConfigService,
    DbConfigService,
    RubApiConfigService,
    ThbApiConfigService,
  ],
})
export class ConfigModule {}
