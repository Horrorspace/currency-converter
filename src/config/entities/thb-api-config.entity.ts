import { IsString, IsUrl, MinLength } from 'class-validator';

/**
 * THB API configuration entity
 */
export class ThbApiConfigEntity {
  /**
   * THB API key
   * @example 'h0wwdcak3ie8q6mvwkh5apxgd9mrb'
   */
  @IsString()
  @MinLength(1)
  key!: string;

  /**
   * THB API URL
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
