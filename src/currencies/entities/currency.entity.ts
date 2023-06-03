import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ICurrency } from '../../shared/currencies/ICurrency';
import { currencyCode } from '../../shared/currencies/currency-code';
import { currencyCodeNames } from '../../shared/currencies/currency-code-names';
import { currencyCodes } from '../../shared/currencies/currency-codes';

/**
 * Currency entity (contains basic data about currency)
 */
export class CurrencyEntity implements ICurrency {
  @IsNumberString({ no_symbols: true })
  @Expose()
  @ApiProperty({
    description: 'Currency ID',
    example: '1',
  })
  currencyId!: string;

  @IsString()
  @MinLength(1)
  @IsEnum(currencyCodeNames)
  @Expose()
  @ApiProperty({
    description: 'Short code which used for the currency',
    enum: currencyCodeNames,
    example: currencyCodes[currencyCodes['USD']],
  })
  code!: currencyCode;

  @IsString()
  @MinLength(1)
  @Expose()
  @ApiProperty({
    description: 'Full name of currency',
    example: 'Доллар США',
  })
  name!: string;
}
