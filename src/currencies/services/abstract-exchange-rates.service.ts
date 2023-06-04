import { OnModuleInit } from '@nestjs/common';
import { currencyCode } from '../../shared/currencies/currency-code';
import { LoggerService } from '../../logger/services/logger.service';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';
import { IGetExchangeRate } from '../types/IGetExchangeRate';
import { IAbstractExchangeRate } from '../types/IAbstractExchangeRate';

/**
 * Abstract class which describes service for getting exchange rates
 */
export abstract class AbstractExchangeRatesService<T extends currencyCode> implements OnModuleInit {
  /**
   * API URL
   * @example 'https://example.com'
   */
  protected readonly abstract apiUrl: string;

  /**
   * Total number of currency codes
   */
  protected readonly numOfCodes: number;

  /**
   * Map of currency codes
   */
  protected readonly codesMap: Map<currencyCode, null>;

  constructor(
    /**
     * Instance of logger
     */
   protected readonly logger: LoggerService,
  ) {
    this.codesMap = new Map();

    for (let code of currencyCodeNames) {
      this.codesMap.set(code, null);
    }

    this.numOfCodes = currencyCodeNames.length;
  }
 
  /**
   * Initial API checking
   */
  public async onModuleInit() {
    try {
      await this.getExchangeRates({ date: new Date('2023-06-01') });
    } catch (e) {
      const instance = this as Object;
      const message = `Got incorrect response from ${instance.constructor.name} API`;
      this.logger.error(message, undefined, instance.constructor.name);
      throw new Error(message);
    }
  }

  /**
   * Gets exchange rates for target currency
   * @param dto - Get exchange rate DTO
   */
  public abstract getExchangeRates(dto: IGetExchangeRate): Promise<Omit<IAbstractExchangeRate, T>>;
}
