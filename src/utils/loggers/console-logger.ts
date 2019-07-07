import { LoggerService, Logger } from "@nestjs/common";
import { GlobalUtil } from "../global-util";

export class ConsoleLogger extends Logger implements LoggerService {

  private static readonly VERBOSE = { PRIORITY: 0, NAME: 'verbose' };
  private static readonly DEBUG = { PRIORITY: 1, NAME: 'debug' };
  private static readonly INFO = { PRIORITY: 2, NAME: 'info' };
  private static readonly WARN = { PRIORITY: 3, NAME: 'warn' };
  private static readonly ERROR = { PRIORITY: 4, NAME: 'error' };

  private readonly BASE_LEVEL = GlobalUtil.isDev() ? ConsoleLogger.DEBUG : ConsoleLogger.INFO;

  constructor(context?: string, isTimestampEnabled?: boolean) {
    super(context, isTimestampEnabled);

  }

  public log(message: any, context?: string) {
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= ConsoleLogger.INFO.PRIORITY) {
      super.log(message, context);
    }
  }
  
  public error(message: any, trace?: string, context?: string) {
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= ConsoleLogger.ERROR.PRIORITY) {
      super.error(message, trace, context);
    }
  }

  public warn(message: any, context?: string) {
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= ConsoleLogger.WARN.PRIORITY) {
      super.warn(message, context);
    }
  }

  public debug(message: any, context?: string) {
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= ConsoleLogger.DEBUG.PRIORITY) {
      super.debug(message, context);
    }
  }

  public verbose(message: any, context?: string) {
    if (GlobalUtil.isDev() && this.BASE_LEVEL.PRIORITY <= ConsoleLogger.VERBOSE.PRIORITY) {
      super.verbose(message, context);
    }
  }
    
}
