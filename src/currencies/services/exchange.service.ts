import { Inject, Injectable } from '@nestjs/common';
import { GetExchangeResultDto } from '../dto/get-exchange-result.dto';
import { RubExchangeRatesService } from './rub-exchange-rates.service';
import { ExchangeResultEntity } from '../entities/exchange-result.entity';
import { RubExchangeRatesRepository } from '../repositories/rub-exchange-rates.repository';
import { IRubExchangeRate } from '../types/IRubExchangeRate';
import { IExchangeService } from '../../shared/currencies/IExchangeService';
import { ThbExchangeRatesRepository } from '../repositories/thb-exchange-rates.repository';
import { ThbExchangeRatesService } from './thb-exchange-rates.service';
import { IThbExchangeRate } from '../types/IThbExchangeRate';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';
import { CurrenciesEntity } from '../entities/currencies.entity';

/**
 * Exchange rates service is responsible for work with exchange rates
 */
@Injectable()
export class ExchangeService implements IExchangeService {
  constructor(
    /**
     * Instance of RUB exchange rates service
     */
    @Inject(RubExchangeRatesRepository) 
    private readonly rubExchangeRatesRepository: RubExchangeRatesRepository,
    /**
     * Instance of RUB exchange rates service
     */
    @Inject(RubExchangeRatesService) 
    private readonly rubExchangeRatesService: RubExchangeRatesService,
    /**
     * Instance of THB exchange rates service
     */
    @Inject(ThbExchangeRatesRepository) 
    private readonly thbExchangeRatesRepository: ThbExchangeRatesRepository,
    /**
     * Instance of THB exchange rates service
     */
    @Inject(ThbExchangeRatesService) 
    private readonly thbExchangeRatesService: ThbExchangeRatesService,
  ) {}

  public async getCurrencies(): Promise<CurrenciesEntity> {
    return {
      currencies: currencyCodeNames
    }
  }

  public async getExchangeResult(dto: GetExchangeResultDto): Promise<ExchangeResultEntity> {
    const { initialCurrency, targetCurrency, initialAmount } = dto;
    const date = dto.date ? new Date(dto.date) : new Date();
    let initialRate = 1;
    let targetRate = 1;

    if (dto.basisCurrency === 'THB') {
      let rates: IThbExchangeRate;

      const ratesInDb = await this.thbExchangeRatesRepository.readOne({ date });
  
      if (ratesInDb) {
        rates = ratesInDb;
      } else {
        rates = await this.thbExchangeRatesService.getExchangeRates({ date });
      }
  
      if (initialCurrency !== 'THB') {
        initialRate = rates[initialCurrency];
      }
  
      if (targetCurrency !== 'THB') {
        targetRate = rates[targetCurrency];
      }
    } else {
      let rates: IRubExchangeRate;

      const ratesInDb = await this.rubExchangeRatesRepository.readOne({ date });
  
      if (ratesInDb) {
        rates = ratesInDb;
      } else {
        rates = await this.rubExchangeRatesService.getExchangeRates({ date });
      }
  
      if (initialCurrency !== 'RUB') {
        initialRate = rates[initialCurrency];
      }
  
      if (targetCurrency !== 'RUB') {
        targetRate = rates[targetCurrency];
      }
    }

    return {
      targetAmount: Math.round(initialRate / targetRate * initialAmount * 100) / 100
    }
  }
}
