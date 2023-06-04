import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { handleError } from '../../core/errors/handle-error';
import { RubExchangeRatesRepository } from '../repositories/rub-exchange-rates.repository';
import { currenciesEvents } from '../types/currencies-events';
import { IRubExchangeRate } from '../types/IRubExchangeRate';
import { LoggerService } from '../../logger/services/logger.service';
import { IThbExchangeRate } from '../types/IThbExchangeRate';
import { ThbExchangeRatesRepository } from '../repositories/thb-exchange-rates.repository';

/**
 * Currencies listener is responsible for handling currencies events
 */
@Injectable()
export class CurrenciesListener {
  constructor(
    /**
     * Instance of logger
     */
    @Inject(LoggerService) private readonly logger: LoggerService,
    /**
     * Instance of RUB exchange rates repository
     */
    @Inject(RubExchangeRatesRepository)
    private readonly rubExchangeRatesRepository: RubExchangeRatesRepository,
    /**
     * Instance of THB exchange rates repository
     */
    @Inject(ThbExchangeRatesRepository)
    private readonly thbExchangeRatesRepository: ThbExchangeRatesRepository,
  ) {}

  /**
   * Handles new RUB exchange rate has been got event
   * @param dto RUB exchange rate DTO
   */
  @OnEvent(currenciesEvents.rubExchangeGot)
  public async handleRubExchangeGot(dto: IRubExchangeRate): Promise<void> {
    try {
      await this.rubExchangeRatesRepository.create(dto);
    } catch (e) {
      const err = handleError(e); 
      this.logger.error(err, undefined, CurrenciesListener.name);
    }
  }

  /**
   * Handles new THB exchange rate has been got event
   * @param dto THB exchange rate DTO
   */
  @OnEvent(currenciesEvents.thbExchangeGot)
  public async handleThbExchangeGot(dto: IThbExchangeRate): Promise<void> {
    try {
      await this.thbExchangeRatesRepository.create(dto);
    } catch (e) {
      const err = handleError(e); 
      this.logger.error(err, undefined, CurrenciesListener.name);
    }
  }
}
