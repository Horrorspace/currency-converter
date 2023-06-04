import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { firstValueFrom } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';
import * as moment from 'moment';
import { RubApiConfigService } from '../../config/services/rub-api-config.service';
import { handleError } from '../../core/errors/handle-error';
import { ServerErrorException } from '../../core/errors/exceptions/server-error.exception';
import { LoggerService } from '../../logger/services/logger.service';
import { IRubExchangeRate } from '../types/IRubExchangeRate';
import { currencyCode } from '../../shared/currencies/currency-code';
import { IGetExchangeRate } from '../types/IGetExchangeRate';
import { currenciesEvents } from '../types/currencies-events';
import { AbstractExchangeRatesService } from './abstract-exchange-rates.service';

/**
 * Currency interface
 */
interface ICur {
  CharCode: currencyCode;
  Value: string;
}

/**
 * Currency exchange rates interface
 */
interface IValCurs {
  Valute: ICur[];
}

/**
 * API response interface
 */
interface IData {
  ValCurs: IValCurs;
}

/**
 * RUB exchange rates service is responsible for getting RUB exchange rates from remote API
 */
@Injectable()
export class RubExchangeRatesService extends AbstractExchangeRatesService<'RUB'> {
  /**
   * RUB API URL
   * @example 'https://example.com'
   */
  protected readonly apiUrl: string;

  /**
   * XML parser
   */
  private readonly xmlParser: XMLParser;

  constructor(
    /**
     * Instance of event emitter
     */
    @Inject(EventEmitter2)
    private readonly eventEmitter: EventEmitter2,
    /**
     * Instance of RUB API config service
     */
    @Inject(RubApiConfigService) private readonly config: RubApiConfigService,
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
    this.xmlParser = new XMLParser();
  }

  public override async getExchangeRates({ date }: IGetExchangeRate): Promise<IRubExchangeRate> {
    try {
      const d = moment(date).format('DD/MM/YYYY');

      const { data, status } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/?date_req1=${d}&date_req2=${d}`)
      );

      switch (status) {
        case 200:
          break;
        default:
          throw new ServerErrorException();
      }

      const parsed = this.xmlParser.parse(data) as IData;
      const rates: Partial<Omit<IRubExchangeRate, 'date'>> = {};
      

      for (let { CharCode, Value } of parsed.ValCurs.Valute) {
        if (!this.codesMap.has(CharCode)) {
          continue;
        }

        const [_a, _b] = Value.split(',');
        const a = parseInt(_a, 10);
        const b = parseInt(_b, 10) / Math.pow(10, _b.length);
        rates[CharCode as Exclude<currencyCode, 'RUB'>] = a + b;
      }

      if (this.numOfCodes - Object.keys(rates).length > 1) {
        throw new ServerErrorException();
      }

      const result = {
        ...rates,
        date,
      } as IRubExchangeRate;
      await this.eventEmitter.emitAsync(currenciesEvents.rubExchangeGot, result);
      return result;
    } catch(e) {
      throw handleError(e);
    }
  }
}
