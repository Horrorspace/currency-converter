import { currencyCode } from './currency-code';

/**
 * Interface contains data for getting of amount of converting currency
 */
export interface IGetExchangeResult {
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
}
