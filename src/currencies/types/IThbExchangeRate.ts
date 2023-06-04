import { IAbstractExchangeRate } from './IAbstractExchangeRate';

/**
 * Interface contains data for creation of a new RUB exchange rate entry
 */
export interface IThbExchangeRate extends Omit<IAbstractExchangeRate, 'THB'> {}
