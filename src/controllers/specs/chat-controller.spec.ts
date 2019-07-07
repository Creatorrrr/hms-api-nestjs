import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, `../../../global-development.env`) });
import { Test, TestingModule } from '@nestjs/testing';
import { ResultTypes } from '@/constants/result-types-constant';
import { ChatController } from '@/controllers/chat-controller';
import { ChatDTO } from '@/dtos/chat-dto';
import { ChatServiceImpl } from '@/services/impl/chat-service-impl';
import { sequelize } from '@/configs/sequelize-config';
import { ChatModel } from '@/models/chat-model';

describe('ChatController', () => {
  let chatController: ChatController;

  let chatId;

  beforeEach(async () => {
    await sequelize.sync();

    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatServiceImpl],
    }).compile();

    chatController = testingModule.get(ChatController);
  });

  describe('registerChat', () => {
    it('should return registered chat', async () => {
      const chat = Object.assign(new ChatDTO(), {
        title: '대화테스트'
      });

      const result = await chatController.registerChat(chat);

      chatId = (result.result.registered as ChatModel).getDataValue('chatId');

      expect(result.status).toBe(ResultTypes.SUCCESS_REGISTER.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_REGISTER.$message);
      expect(result.result.registered).toBeDefined();
    });
  });

  describe('getChatOne', () => {
    it('should return chat', async () => {
      const result = await chatController.getChatOne(chatId);

      expect(result.status).toBe(ResultTypes.SUCCESS_GET.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_GET.$message);
      expect(result.result.chat).toBeDefined();
    });
  });

  describe('getChatList', () => {
    it('should return chat list', async () => {
      const chat = Object.assign(new ChatDTO(), { title: '대화테스트' });
      const result = await chatController.getChatList(chat, undefined, undefined, 10, 0);

      expect(result.status).toBe(ResultTypes.SUCCESS_GET.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_GET.$message);
      expect(result.result.chats.length).toBeGreaterThan(0);
    });
  });

  describe('modifyChat', () => {
    it('should return modified count', async () => {
      const chat = Object.assign(new ChatDTO(), {
        title: '대화테스트1'
      });

      const result = await chatController.modifyChat(chatId, chat);

      expect(result.status).toBe(ResultTypes.SUCCESS_MODIFY.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_MODIFY.$message);
      expect(result.result.modified).toBeGreaterThan(0);
    });
  });

  describe('removeChat', () => {
    it('should return removed count', async () => {
      const result = await chatController.removeChat(chatId);

      expect(result.status).toBe(ResultTypes.SUCCESS_REMOVE.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_REMOVE.$message);
      expect(result.result.removed).toBeGreaterThan(0);
    });
  });

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });
});
