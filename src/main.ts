import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, `../global-${process.env.NODE_ENV || 'development'}.env`) });
import 'module-alias/register';
import { sequelize } from '@/configs/sequelize-config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app-module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConsoleLogger } from '@/utils/loggers/console-logger';

(async () => {
  try {
    const environment = process.env.NODE_ENV || 'development';
    Logger.log(`Environment : ${environment}`);
  
    // 데이터베이스 초기화
    await sequelize.sync({force: environment === 'development'});
  
    // Nest서버 생성
    const app = await NestFactory.create(AppModule, { logger: new ConsoleLogger() });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, skipMissingProperties: true, transform: true }));
    await app.listen(30080);
  } catch(error) {
    Logger.error(error);
  }
})();
