import { currencyCode } from './currency-code';
import { currencyCodes } from './currency-codes';

/**
 * List of currency codes
 */
export const currencyCodeNames = Object.values(currencyCodes).filter(v => typeof v === 'string') as currencyCode[];
