import { IExchangeRates } from './IExchangeRates';
import { IGetExchangeRate } from './IGetExchangeRate';

/**
 * Interface of abstract exchange rate
 */
export type IAbstractExchangeRate = IExchangeRates & IGetExchangeRate;
