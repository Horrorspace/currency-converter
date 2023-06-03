import { ICurrency } from './ICurrency';

/**
 * Currencies interface (contains list of all currencies which are available)
 */
export interface ICurrencies {
  /**
   * List of available currencies
   */
  currencies: ICurrency[];
}