import { IsString, IsUrl, MinLength } from 'class-validator';

/**
 * Database configuration entity (contains parameters of connection to DB)
 */
export class DbConfigEntity {
  /**
   * Database connection string
   * @example 'postgres://user:pass@localhost:5432/db?sslmode=require'
   */
  @IsString()
  @MinLength(1)
  @IsUrl({
    protocols: ['postgres'],
    require_tld: false,
    require_host: true,
    require_port: true,
    require_protocol: true,
    require_valid_protocol: true,
  })
  url!: string;
}
