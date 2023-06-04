import { baseCurrency } from './base-currency';
import { currencyCode } from './currency-code';

/**
 * Interface contains data for getting of amount of converting currency
 */
export interface IGetExchangeResult {
  /**
   * Date of exchange
   * @example '2023-06-01'
   */
  date?: string;

  /**
   * Currency from which convertation will be made
   * @example 'USD'
   */
  initialCurrency: currencyCode;

  /**
   * Currency to which convertation will be made
   * @example 'EUR'
   */
  targetCurrency: currencyCode;

  /**
   * Amount of initial currency to convertation
   * @example 100
   */
  initialAmount: number;

  /**
   * Basis currency for calculation
   * @example 'RUB'
   */
  basisCurrency?: baseCurrency;
}
