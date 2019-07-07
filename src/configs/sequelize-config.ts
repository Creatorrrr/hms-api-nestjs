import { Sequelize } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { GymModel } from '@/models/gym-model';
import { AccountGymTrainerModel } from '@/models/account-gym-trainer-model';
import { AccountGymMemberModel } from '@/models/account-gym-member-model';
import { NoticeModel } from '@/models/notice-model';
import { HealthDiaryModel } from '@/models/health-diary-model';
import { FoodModel } from '@/models/food-model';
import { DietModel } from '@/models/diet-model';
import { DietFoodModel } from '@/models/diet-food-model';
import { ChatModel } from '@/models/chat-model';
import { ChatContentModel } from '@/models/chat-content-model';
import { ChatAccountModel } from '@/models/chat-account-model';
import { GlobalUtil } from '@/utils/global-util';
import { Logger } from '@nestjs/common';

const database = process.env.DB_DATABASE as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const port = parseInt(process.env.DB_PORT) as number;
const dialect = process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
const maxPoolConnection = parseInt(process.env.DB_MAX_CONNECTION as string, 10);
const minPoolConnection = parseInt(process.env.DB_MIN_CONNECTION as string, 10);
const timezone = process.env.DB_TIMEZONE as string;

export const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  port,
  dialect,
  pool: {
    max: maxPoolConnection,
    min: minPoolConnection,
  },
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  },
  dialectOptions: {
    useUTC: true,
    timezone,
  },
  logging: GlobalUtil.isDev() ? (message) => Logger.debug(message, 'SequelizeConfig') : false,
});

sequelize.addModels([
  AccountModel,
  GymModel,
  AccountGymTrainerModel,
  AccountGymMemberModel,
  NoticeModel,
  HealthDiaryModel,
  FoodModel,
  DietModel,
  DietFoodModel,
  ChatModel,
  ChatAccountModel,
  ChatContentModel,
]);
