import { Module } from '@nestjs/common';
import { SystemController } from '@/controllers/system-controller';
import { AccountController } from '@/controllers/account-controller';
import { GymController } from '@/controllers/gym-controller';
import { NoticeController } from '@/controllers/notice-controller';
import { HealthDiaryController } from '@/controllers/health-diary-controller';
import { FoodController } from '@/controllers/food-controller';
import { DietController } from '@/controllers/diet-controller';
import { ChatController } from '@/controllers/chat-controller';
import { AccountServiceImpl } from '@/services/impl/account-service-impl';
import { GymServiceImpl } from '@/services/impl/gym-service-impl';
import { NoticeServiceImpl } from '@/services/impl/notice-service-impl';
import { FoodServiceImpl } from '@/services/impl/food-service-impl';
import { DietServiceImpl } from '@/services/impl/diet-service-impl';
import { HealthDiaryServiceImpl } from '@/services/impl/health-diary-service-impl';
import { ChatServiceImpl } from '@/services/impl/chat-service-impl';

@Module({
  imports: [],
  controllers: [
    SystemController,
    AccountController,
    GymController,
    NoticeController,
    HealthDiaryController,
    FoodController,
    DietController,
    ChatController,
  ],
  providers: [
    AccountServiceImpl,
    GymServiceImpl,
    NoticeServiceImpl,
    HealthDiaryServiceImpl,
    FoodServiceImpl,
    DietServiceImpl,
    ChatServiceImpl,
  ],
})
export class AppModule {}
