import { IsEnum, IsString, MinLength } from 'class-validator';
import { appModes } from '../types/app-modes';
import type { appMode } from '../types/app-mode';

/**
 * Application configuration entity (contains general parameters of application configuration)
 */
export class AppConfigEntity {
  /**
   * Mode of application (development, production)
   * @example 'development'
   */
  @IsString()
  @MinLength(1)
  @IsEnum(appModes)
  mode!: appMode;
}
