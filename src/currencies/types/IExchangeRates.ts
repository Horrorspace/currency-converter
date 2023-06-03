import { currencyCode } from '../../shared/currencies/currency-code';

/**
 * Interface contains all exchange rates
 */
export type IExchangeRates = {
  [key in currencyCode]: number;
}
