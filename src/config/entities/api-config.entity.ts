import { IsUrl, IsInt, Min, Max } from 'class-validator';

/**
 * API configuration entity (contains parameters of API configuration)
 */
export class ApiConfigEntity {
  /**
   * Host on which API must run
   * @example '0.0.0.0'
   */
  @IsUrl({
    require_port: false,
    require_protocol: false,
    require_tld: false,
    require_valid_protocol: false,
  })
  host!: string;

  /**
   * Port on which API must run
   * @example 3000
   */
  @IsInt()
  @Min(1)
  @Max(65535)
  port!: number;
}
