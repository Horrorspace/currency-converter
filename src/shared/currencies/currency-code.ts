import { currencyCodes } from './currency-codes';

/**
 * Type represents value which belongs to currency codes enumeration
 */
export type currencyCode = keyof typeof currencyCodes
