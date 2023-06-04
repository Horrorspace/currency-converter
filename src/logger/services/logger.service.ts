import { Injectable, LoggerService as ILogger, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger implements ILogger {}
