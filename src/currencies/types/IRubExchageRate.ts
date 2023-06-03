import { IAbstractExchangeRate } from './IAbstractExchangeRate';

/**
 * Interface contains data for creation of a new RUB exchage rate entry
 */
export interface IRubExchageRate extends Omit<IAbstractExchangeRate, 'RUB'> {}
