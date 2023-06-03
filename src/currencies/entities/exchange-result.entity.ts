import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Expose } from 'class-transformer';
import { IExchangeResult } from '../../shared/currencies/IExchangeResult';

/**
 * Entity contains calculated exchange rate for requested currencies
 */
export class ExchangeResultEntity implements IExchangeResult {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Expose()
  @ApiProperty({
    description: 'Amount of target currency after convertation',
    example: 93.23,
  })
  targetAmount!: number;
}
