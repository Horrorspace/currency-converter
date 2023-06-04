import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '../../core/errors/exceptions/conflict.exception';
import { PrismaService } from '../../prisma/prisma.service';
import { IThbExchangeRate } from '../types/IThbExchangeRate';
import { IGetExchangeRate } from '../types/IGetExchangeRate';

/**
 * THB exchange rates repository is responsible for work with THB rates entries in database
 */
@Injectable()
export class ThbExchangeRatesRepository {
  constructor(
    /**
     * Prisma service instance
     */
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  /**
   * Creates new THB exchange rate entry in database
   * @param dto THB exchange rate
   */
  public async create(dto: IThbExchangeRate): Promise<void> {
    return await this.prisma.$transaction(async (tx) => {
      const isExist = await tx.thbExchangeRate.findUnique({
        where: { date: dto.date }
      });

      if (isExist) {
        throw new ConflictException();
      }

      await tx.thbExchangeRate.create({ data: dto });
    });
  }

  /**
   * Gets THB exchange rate entry from database
   * @param dto Get exchange rate DTO
   */
  public async readOne({ date }: IGetExchangeRate): Promise<IThbExchangeRate | null> {
    return await this.prisma.thbExchangeRate.findUnique({
      where: { date }
    });
  }
}
