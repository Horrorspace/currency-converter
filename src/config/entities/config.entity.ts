import { IsObject, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiConfigEntity } from './api-config.entity';
import { AppConfigEntity } from './app-config.entity';
import { DbConfigEntity } from './db-config.entity';
import { RubApiConfigEntity } from './rub-api-config.entity';
import { ThbApiConfigEntity } from './thb-api-config.entity';

/**
 * Configuration entity (root configuration entity which contains all other configuration entities)
 */
export class ConfigEntity {
  /**
   * API configuration entity
   */
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApiConfigEntity)
  api!: ApiConfigEntity;

  /**
   * Application configuration entity
   */
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AppConfigEntity)
  app!: AppConfigEntity;

  /**
   * Database configuration entity
   */
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DbConfigEntity)
  db!: DbConfigEntity;

  /**
   * RUB API configuration entity
   */
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => RubApiConfigEntity)
  rubApi!: RubApiConfigEntity;

  /**
   * THB API configuration entity
   */
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ThbApiConfigEntity)
  thbApi!: ThbApiConfigEntity;
}
