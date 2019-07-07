import { LoggerService, Logger } from "@nestjs/common";
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { GlobalUtil } from "../global-util";

export class WinstonLogger extends Logger implements LoggerService {

  private static readonly VERBOSE = { PRIORITY: 0, NAME: 'verbose' };
  private static readonly DEBUG = { PRIORITY: 1, NAME: 'debug' };
  private static readonly INFO = { PRIORITY: 2, NAME: 'info' };
  private static readonly WARN = { PRIORITY: 3, NAME: 'warn' };
  private static readonly ERROR = { PRIORITY: 4, NAME: 'error' };

  private readonly BASE_LEVEL = GlobalUtil.isDev() ? WinstonLogger.DEBUG : WinstonLogger.INFO;

  private readonly logger;

  constructor(context?: string, isTimestampEnabled?: boolean) {
    super(context, isTimestampEnabled);

    this.logger = winston.createLogger({
      level: this.BASE_LEVEL.NAME,
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${level}:\t${process.pid}   ${timestamp}   ${message}`;
        }
      )),
      transports: [
        new DailyRotateFile({
          filename: 'logs/error/error-%DATE%.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new DailyRotateFile({
          filename: 'logs/combined/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });

  }

  public log(message: any, context?: string) {
    this.logger.info(`${context && '[' + context + ']'} ${this.toPrettyMessage(message)}`);
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= WinstonLogger.INFO.PRIORITY) {
      super.log(message, context);
    }
  }
  
  public error(message: any, trace?: string, context?: string) {
    this.logger.error(`${context && '[' + context + ']'} ${this.toPrettyMessage(message)}`);
    if (trace) this.logger.error(`${trace} + \n`);
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= WinstonLogger.ERROR.PRIORITY) {
      super.error(message, trace, context);
    }
  }

  public warn(message: any, context?: string) {
    this.logger.warn(`${context && '[' + context + ']'} ${this.toPrettyMessage(message)}`);
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= WinstonLogger.WARN.PRIORITY) {
      super.warn(message, context);
    }
  }

  public debug(message: any, context?: string) {
    this.logger.debug(`${context && '[' + context + ']'} ${this.toPrettyMessage(message)}`);
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= WinstonLogger.DEBUG.PRIORITY) {
      super.debug(message, context);
    }
  }

  public verbose(message: any, context?: string) {
    this.logger.verbose(`${context && '[' + context + ']'} ${this.toPrettyMessage(message)}`);
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= WinstonLogger.VERBOSE.PRIORITY) {
      super.verbose(message, context);
    }
  }

  /**
   * 파라미터가 object일 경우 json으로 변환
   * 
   * @param param 확인할 파라미터
   */
  private toPrettyMessage(param: any) {
    return param && typeof param === 'object' ? JSON.stringify(param, null, 2) : param;
  }
    
}
