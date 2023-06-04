import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { RubExchangeRatesService } from './services/rub-exchange-rates.service';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { ExchangeService } from './services/exchange.service';
import { CurrenciesController } from './controllers/currencies.controller';
import { RubExchangeRatesRepository } from './repositories/rub-exchange-rates.repository';
import { CurrenciesListener } from './events/currencies.listener';
import { ThbExchangeRatesService } from './services/thb-exchange-rates.service';
import { ThbExchangeRatesRepository } from './repositories/thb-exchange-rates.repository';

/**
 * Currencies module is responsible for exchange currency
 */
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    LoggerModule,
    PrismaModule,
  ],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesListener, 
    ExchangeService, 
    RubExchangeRatesRepository, 
    RubExchangeRatesService,
    ThbExchangeRatesRepository,
    ThbExchangeRatesService,
  ],
  exports: [ExchangeService],
})
export class CurrenciesModule {}
