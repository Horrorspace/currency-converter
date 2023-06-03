import { IExchangeRates } from './IExchangeRates';

/**
 * Interface of abstract exchange rate
 */
export interface IAbstractExchangeRate extends IExchangeRates {
  date: Date;
}
