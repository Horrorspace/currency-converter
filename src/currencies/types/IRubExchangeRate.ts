import { IAbstractExchangeRate } from './IAbstractExchangeRate';

/**
 * Interface contains data for creation of a new RUB exchange rate entry
 */
export interface IRubExchangeRate extends Omit<IAbstractExchangeRate, 'RUB'> {}
