import { Inject, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { apiRoutes } from '../../shared/common/api-routes';
import { Controller } from '../../core/rest/controller.decorator';
import { Serializable } from '../../core/rest/serializable.decorator';
import { ExchangeResultEntity } from '../entities/exchange-result.entity';
import { GetExchangeResultDto } from '../dto/get-exchange-result.dto';
import { ExchangeService } from '../services/exchange.service';
import { CurrenciesEntity } from '../entities/currencies.entity';

/**
 * Currencies controller is responsible for handling currencies routes requests
 */
@Controller(apiRoutes.currencies)
export class CurrenciesController {
  constructor(
    /**
     * Instance of exchange rates service
     */
    @Inject(ExchangeService) private readonly service: ExchangeService,
  ) {}

  /**
   * Returns available currencies
   */
  @Get()
  @Serializable(CurrenciesEntity)
  @ApiOperation({ summary: 'get available currencies' })
  @ApiOkResponse({
    description: 'Amount of target currency',
    type: CurrenciesEntity,
  })
  public async getCurrencies() {
    return await this.service.getCurrencies();
  }

  /**
   * Returns amount of target currency
   * @param dto Get exchange result DTO
   */
  @Get('/exchange')
  @Serializable(ExchangeResultEntity)
  @ApiOperation({ summary: 'get amount of target currency' })
  @ApiOkResponse({
    description: 'Amount of target currency',
    type: ExchangeResultEntity,
  })
  public async getExchangeResult(@Query() dto: GetExchangeResultDto) {
    return await this.service.getExchangeResult(dto);
  }
}
