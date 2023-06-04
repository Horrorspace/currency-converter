import { currencyCode } from './currency-code';

/**
 * Currencies interface (contains list of all currencies which are available)
 */
export interface ICurrencies {
  /**
   * List of available currencies
   */
  currencies: currencyCode[];
}