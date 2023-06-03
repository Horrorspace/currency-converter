import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ConfigEntity } from '../entities/config.entity';
import { appMode } from '../types/app-mode';
import { AppConfigEntity } from '../entities/app-config.entity';
import { ApiConfigEntity } from '../entities/api-config.entity';
import { DbConfigEntity } from '../entities/db-config.entity';
import { RubApiConfigEntity } from '../entities/rub-api-config.entity';
import { ThbApiConfigEntity } from '../entities/thb-api-config.entity';

/**
 * Gets configuration entity
 */
export function configuration(): ConfigEntity {
  const apiConfig: ApiConfigEntity = {
    host: process.env.API_HOST ?? '',
    port: parseInt(process.env.API_PORT ?? '', 10),
  };
  const appConfig: AppConfigEntity = {
    mode: process.env.APP_MODE as appMode,
  };
  const dbConfig: DbConfigEntity = {
    url: process.env.DATABASE_URL ?? '',
  };
  const rubApiConfig: RubApiConfigEntity = {
    url: process.env.RUB_API_URL ?? '',
  };
  const thbApiConfig: ThbApiConfigEntity = {
    key: process.env.THB_API_KEY ?? '',
    url: process.env.THB_API_URL ?? '',
  };
  const config: ConfigEntity = {
    api: apiConfig,
    app: appConfig,
    db: dbConfig,
    rubApi: rubApiConfig,
    thbApi: thbApiConfig,
  };

  const entity = plainToClass(ConfigEntity, config);
  const errors = validateSync(entity);

  if (errors.length > 0) {
    const message = errors.map((err) => err.toString()).reduce((acc, val) => acc + val, '');
    throw new Error(message);
  }

  return config;
}
