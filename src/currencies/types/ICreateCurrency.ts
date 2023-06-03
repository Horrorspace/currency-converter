import { ICurrency } from '../../shared/currencies/ICurrency';

/**
 * Interface contains data for creation of a new currency entry
 */
export type ICreateCurrency = Omit<ICurrency, 'currencyId'>;
