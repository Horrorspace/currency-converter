import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ICurrencies } from '../../shared/currencies/ICurrencies';
import { currencyCode } from '../../shared/currencies/currency-code';
import { currencyCodes } from '../../shared/currencies/currency-codes';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';

/**
 * Currencies entity (contains list of all currencies which are available)
 */
export class CurrenciesEntity implements ICurrencies {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @IsEnum(currencyCodeNames, { each: true })
  @Expose()
  @ApiProperty({
    description: 'List of available currencies',
    enum: currencyCodeNames,
    isArray: true,
  })
  currencies!: currencyCode[];
}
