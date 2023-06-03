import { currencyCode } from './currency-code';

/**
 * Currency interface (contains basic data about currency)
 */
export interface ICurrency {
  /**
   * Currency ID
   * @example '1'
   */
  currencyId: string;

  /**
   * Short code which used for the currency
   * @example 'USD'
   */
  code: currencyCode;

  /**
   * Full name of currency
   * @example 'Доллар США'
   */
  name: string;
}
