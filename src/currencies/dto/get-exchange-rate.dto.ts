import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IGetExchangeResult } from '../../shared/currencies/IGetExchangeResult';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';
import { currencyCodes } from '../../shared/currencies/currency-codes';
import { currencyCode } from '../../shared/currencies/currency-code';

/**
 * Data Transfer Object contains data for getting of amount of converting currency
 */
export class GetExchangeRateDto implements IGetExchangeResult {
  @IsString()
  @MinLength(1)
  @IsEnum(currencyCodeNames)
  @Expose()
  @ApiProperty({
    description: 'Currency from which convertation will be made',
    enum: currencyCodeNames,
    example: currencyCodes[currencyCodes['USD']],
  })
  initialCurrency!: currencyCode;

  @IsString()
  @MinLength(1)
  @IsEnum(currencyCodeNames)
  @Expose()
  @ApiProperty({
    description: 'Currency to which convertation will be made',
    enum: currencyCodeNames,
    example: currencyCodes[currencyCodes['EUR']],
  })
  targetCurrency!: currencyCode;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Expose()
  @ApiProperty({
    description: 'Amount of initial currency to convertation',
    example: 100,
  })
  initialAmount!: number;
}
