import { ChatModel } from '@/models/chat-model';
import { ChatDTO } from '@/dtos/chat-dto';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { ChatContentDTO } from '@/dtos/chat-content-dto';
import { ChatContentModel } from '@/models/chat-content-model';
import { Op } from 'sequelize';
import { ChatAccountModel } from '@/models/chat-account-model';
import { ChatAccountDTO } from '@/dtos/chat-account-dto';
import { Injectable } from '@nestjs/common';
import { ChatService } from '@/services/chat-service';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 대화 서비스 구현
 */
@Injectable()
export class ChatServiceImpl extends AbstractCommonService implements ChatService {
    
  constructor() {
    super();
    this.logger.debug('ChatService created');
  }

  public async registerChat(chat: ChatDTO) {
    return { registered: await ChatModel.create(chat) };
  }

  public async modifyChat(chatId: number, chat: ChatDTO) {
    const result = (await ChatModel.update(chat, { where: { chatId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeChat(chatId: number) {
    const result = await ChatModel.destroy({ where: { chatId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getChatOne(chatId: number) {
    return { chat: await ChatModel.findByPk(chatId) };
  }

  public async getChatList(chat: ChatDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: chat.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { chats: await ChatModel.findAll({ where, limit, offset }) };
  }

  public async registerChatAccount(chatId: number, chatAccount: ChatAccountDTO) {
    chatAccount = Object.assign(chatAccount, { chatId });
    return { registered: await ChatAccountModel.create(chatAccount) };
  }

  public async modifyChatAccount(chatId: number, accountId: number, chatAccount: ChatAccountDTO) {
    const result = (await ChatAccountModel.update(chatAccount, { where: { [Op.and]: { chatId, accountId } } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeChatAccount(chatId: number, accountId: number) {
    const result = await ChatAccountModel.destroy({ where: { [Op.and]: { chatId, accountId } } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getChatAccountOne(chatId: number, accountId: number) {
    return { chatAccount: await ChatAccountModel.findOne({ where: { [Op.and]: { chatId, accountId } } }) };
  }

  public async getChatAccountList(chatId: number, chatAccount: ChatAccountDTO, keyword: string, column: string, limit: number, offset: number) {
    chatAccount = Object.assign(chatAccount, { chatId });
    const where = { [Op.and]: chatAccount.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { chatAccounts: await ChatAccountModel.findAll({ where, limit, offset }) };
  }

  public async registerChatContent(chatId: number, chatContent: ChatContentDTO) {
    chatContent = Object.assign(chatContent, { chatId });
    return { registered: await ChatContentModel.create(chatContent) };
  }

  public async modifyChatContent(chatId: number, chatContentId: number, chatContent: ChatContentDTO) {
    const result = (await ChatContentModel.update(chatContent, { where: { [Op.and]: { chatId, chatContentId } } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeChatContent(chatId: number, chatContentId: number) {
    const result = await ChatContentModel.destroy({ where: { [Op.and]: { chatId, chatContentId } } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getChatContentOne(chatId: number, chatContentId: number) {
    return { chatContent: await ChatContentModel.findOne({ where: { [Op.and]: { chatId, chatContentId } } }) };
  }

  public async getChatContentList(chatId: number, chatContent: ChatContentDTO, keyword: string, column: string, limit: number, offset: number) {
    chatContent = Object.assign(chatContent, { chatId });
    const where = { [Op.and]: chatContent.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { chatContents: await ChatContentModel.findAll({ where, limit, offset }) };
  }

}
