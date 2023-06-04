import { ICurrencies } from './ICurrencies';
import { IExchangeResult } from './IExchangeResult';
import { IGetExchangeResult } from './IGetExchangeResult';

/**
 * Interface contains exchange service methods
 */
export interface IExchangeService {
  /**
   * Returns available currencies
   */
  getCurrencies(): Promise<ICurrencies>;

  /**
   * Returns amount of target currency
   * @param dto - Get exchange result DTO
   */
  getExchangeResult(dto: IGetExchangeResult): Promise<IExchangeResult>;
}
