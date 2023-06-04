import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import { ThbApiConfigService } from '../../config/services/thb-api-config.service';
import { handleError } from '../../core/errors/handle-error';
import { ServerErrorException } from '../../core/errors/exceptions/server-error.exception';
import { LoggerService } from '../../logger/services/logger.service';
import { IThbExchangeRate } from '../types/IThbExchangeRate';
import { currencyCode } from '../../shared/currencies/currency-code';
import { IGetExchangeRate } from '../types/IGetExchangeRate';
import { currenciesEvents } from '../types/currencies-events';
import { AbstractExchangeRatesService } from './abstract-exchange-rates.service';

interface IDataDetail {
  currency_id: currencyCode;
  mid_rate: string;
}

interface IResData {
  data_detail: IDataDetail[]
}

interface IResult {
  data: IResData;
}

/**
 * API response interface
 */
interface IData {
  result: IResult;
}

/**
 * THB exchange rates service is responsible for getting THB exchange rates from remote API
 */
@Injectable()
export class ThbExchangeRatesService extends AbstractExchangeRatesService<'THB'> {
  /**
   * THB API URL
   * @example 'https://example.com'
   */
  protected readonly apiUrl: string;

  /**
   * THB API key
   * @example 'h0wwdcak3ie8q6mvwkh5apxgd9mrb'
   */
  private readonly apiKey: string;

  constructor(
    /**
     * Instance of event emitter
     */
    @Inject(EventEmitter2)
    private readonly eventEmitter: EventEmitter2,
    /**
     * Instance of RUB API config service
     */
    @Inject(ThbApiConfigService) private readonly config: ThbApiConfigService,
    /**
     * Instance of HTTP service
     */
    @Inject(HttpService) private readonly httpService: HttpService,
    /**
     * Instance of logger
     */
    @Inject(LoggerService) protected readonly logger: LoggerService,
  ) {
    super(logger);
    this.apiUrl = this.config.url;
    this.apiKey = this.config.key;
  }

  public override async getExchangeRates({ date }: IGetExchangeRate): Promise<any> {
    try {
      const d = moment(date).format('YYYY-MM-DD');

      const { data, status } = await firstValueFrom(
        this.httpService.get<IData>(
          `${this.apiUrl}/?start_period=${d}&end_period=${d}`,
          {
            headers: {
              'X-IBM-Client-Id': this.apiKey
            }
          }
        )
      );

      switch (status) {
        case 200:
          break;
        default:
          throw new ServerErrorException();
      }

      const rates: Partial<Omit<IThbExchangeRate, 'date'>> = {};

      for (let { currency_id, mid_rate } of data.result.data.data_detail) {
        if (!this.codesMap.has(currency_id)) {
          continue;
        }

        const val = parseFloat(mid_rate);

        if (Number.isNaN(val)) {
          throw new ServerErrorException();
        }
        
        rates[currency_id as Exclude<currencyCode, 'THB'>] = val;
      }

      if (this.numOfCodes - Object.keys(rates).length > 1) {
        throw new ServerErrorException();
      }

      const result = {
        ...rates,
        date,
      } as IThbExchangeRate;
      await this.eventEmitter.emitAsync(currenciesEvents.thbExchangeGot, result);
      return result;
    } catch(e) {
      throw handleError(e);
    }
  }
}
