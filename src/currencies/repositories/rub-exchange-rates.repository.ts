import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '../../core/errors/exceptions/conflict.exception';
import { PrismaService } from '../../prisma/prisma.service';
import { IRubExchangeRate } from '../types/IRubExchangeRate';
import { IGetExchangeRate } from '../types/IGetExchangeRate';

/**
 * RUB exchange rates repository is responsible for work with RUB rates entries in database
 */
@Injectable()
export class RubExchangeRatesRepository {
  constructor(
    /**
     * Prisma service instance
     */
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  /**
   * Creates new RUB exchange rate entry in database
   * @param dto RUB exchange rate
   */
  public async create(dto: IRubExchangeRate): Promise<void> {
    return await this.prisma.$transaction(async (tx) => {
      const isExist = await tx.rubExchangeRate.findUnique({
        where: { date: dto.date }
      });

      if (isExist) {
        throw new ConflictException();
      }

      await tx.rubExchangeRate.create({ data: dto });
    });
  }

  /**
   * Gets RUB exchange rate entry from database
   * @param dto Get exchange rate DTO
   */
  public async readOne({ date }: IGetExchangeRate): Promise<IRubExchangeRate | null> {
    return await this.prisma.rubExchangeRate.findUnique({
      where: { date }
    });
  }
}
