import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Matches, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { IGetExchangeResult } from '../../shared/currencies/IGetExchangeResult';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';
import { currencyCodes } from '../../shared/currencies/currency-codes';
import { currencyCode } from '../../shared/currencies/currency-code';
import { baseCurrency } from '../../shared/currencies/base-currency';
import { baseCurrencies } from '../../shared/currencies/base-currencies';

/**
 * Data Transfer Object contains data for getting of amount of converting currency
 */
export class GetExchangeResultDto implements IGetExchangeResult {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @Matches(/\d{4}\-\d{2}\-\d{2}/)
  @Expose()
  @ApiPropertyOptional({
    description: 'Date of exchange',
    example: '2023-06-01',
  })
  date?: string;

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

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Expose()
  @ApiProperty({
    description: 'Amount of initial currency to convertation',
    example: 100,
  })
  initialAmount!: number;


  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsEnum(baseCurrencies)
  @Expose()
  @ApiPropertyOptional({
    description: 'Basis currency for calculation',
    enum: baseCurrencies,
    example: baseCurrencies['RUB'],
  })
  basisCurrency?: baseCurrency;
}
