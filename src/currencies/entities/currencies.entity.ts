import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ICurrencies } from '../../shared/currencies/ICurrencies';
import { CurrencyEntity } from './currency.entity';

/**
 * Currencies entity (contains list of all currencies which are available)
 */
export class CurrenciesEntity implements ICurrencies {
  @IsArray()
  @ArrayNotEmpty()
  @IsObject({ each: true })
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested({ each: true })
  @Type(() => CurrencyEntity)
  @Expose()
  @ApiProperty({
    description: 'List of available currencies',
    type: CurrencyEntity,
  })
  currencies!: CurrencyEntity[];
}
