import { IsString, IsUrl, MinLength } from 'class-validator';

/**
 * RUB API configuration entity
 */
export class RubApiConfigEntity {
  /**
   * RUB API URL
   * @example 'https://example.com'
   */
  @IsString()
  @MinLength(1)
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_host: true,
    require_port: false,
    require_protocol: true,
    require_valid_protocol: true,
  })
  url!: string;
}
