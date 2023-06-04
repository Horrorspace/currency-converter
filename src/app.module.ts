import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from './config/config.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule,
    CurrenciesModule,
    LoggerModule,
    PrismaModule
  ]
})
export class AppModule {}
