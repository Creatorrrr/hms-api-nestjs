import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { ChatServiceImpl } from '@/services/impl/chat-service-impl';
import { ChatDTO } from '@/dtos/chat-dto';
import { ChatContentDTO } from '@/dtos/chat-content-dto';
import { ChatAccountDTO } from '@/dtos/chat-account-dto';
import { ChatService } from '@/services/chat-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 대화 API 컨트롤러
 */
@Controller('/api/chats')
export class ChatController extends AbstractCommonController {

  constructor(@Inject( ChatServiceImpl ) private readonly chatService: ChatService) {
    super();
    this.logger.debug('ChatController created');
  }
  
  /**
   * 대화 등록
   * 
   * @param chat 등록할 대화의 데이터
   */
  @Post()
  public async registerChat(@Body('chat') chat: ChatDTO) {
    try {
      this.logger.debug(chat);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.chatService.registerChat(chat));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chat }, error: error.message });
    }
  }

  /**
   * 대화 수정
   * 
   * @param chatId 수정할 대화의 아이디
   * @param chat 수정할 대화의 데이터
   */
  @Put('/:chatId')
  public async modifyChat(@Param('chatId') chatId: number, @Body('chat') chat: ChatDTO) {
    try {
      this.logger.debug(chat);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.chatService.modifyChat(chatId, chat));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, chat }, error: error.message });
    }
  }

  /**
   * 대화 삭제
   * 
   * @param chatId 삭제할 대화의 아이디
   */
  @Delete('/:chatId')
  public async removeChat(@Param('chatId') chatId: number) {
    try {
      this.logger.debug(chatId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.chatService.removeChat(chatId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId }, error: error.message });
    }
  }

  /**
   * 대화 단일 조회
   * 
   * @param chatId 조회할 대화의 아이디
   */
  @Get('/:chatId')
  public async getChatOne(@Param('chatId') chatId: number) {
    try {
      this.logger.debug(chatId);

      const result = await this.chatService.getChatOne(chatId);
      
      if (result.chat) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId }, error: error.message });
    }
  }

  /**
   * 대화 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getChatList(
      @Query('f', ParseFilterPipe) chat: ChatDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(chat);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.chatService.getChatList(chat, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: chat, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }
  
  /**
   * 대화계정 등록
   * 
   * @param chatId 대화계정이 등록될 대화의 아이디
   * @param chatAccount 등록할 대화계정의 데이터
   */
  @Post('/:chatId/accounts')
  public async registerChatAccount(@Param('chatId') chatId: number, @Body('chat-account') chatAccount: ChatAccountDTO) {
    try {
      this.logger.debug(chatAccount);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.chatService.registerChatAccount(chatId, chatAccount));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, chatAccount }, error: error.message });
    }
  }

  /**
   * 대화계정 수정
   * 
   * @param chatId 대화계정이 수정될 대화의 아이디
   * @param accountId 대화계정이 수정될 대화의 아이디
   * @param chatAccount 수정할 대화계정의 데이터
   */
  @Put('/:chatId/accounts/:accountId')
  public async modifyChatAccount(
      @Param('chatId') chatId: number, @Param('accountId') accountId: number, @Body('chat-account') chatAccount: ChatAccountDTO) {
    try {
      this.logger.debug(chatAccount);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.chatService.modifyChatAccount(chatId, accountId, chatAccount));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, accountId, chatAccount }, error: error.message });
    }
  }

  /**
   * 대화계정 삭제
   * 
   * @param chatId 대화계정이 삭제될 대화의 아이디
   * @param accountId 대화계정이 삭제될 대화의 아이디
   */
  @Delete('/:chatId/accounts/:accountId')
  public async removeChatAccount(@Param('chatId') chatId: number, @Param('accountId') accountId: number) {
    try {
      this.logger.debug(accountId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.chatService.removeChatAccount(chatId, accountId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, accountId }, error: error.message });
    }
  }

  /**
   * 대화계정 단일 조회
   * 
   * @param chatId 대화계정이 조회될 대화의 아이디
   * @param accountId 대화계정이 조회될 계정의 아이디
   */
  @Get('/:chatId/accounts/:accountId')
  public async getChatAccountOne(@Param('chatId') chatId: number, @Param('accountId') accountId: number) {
    try {
      this.logger.debug(accountId);

      const result = await this.chatService.getChatAccountOne(chatId, accountId);
      
      if (result.chatAccount) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, accountId }, error: error.message });
    }
  }

  /**
   * 대화계정 리스트 조회
   * 
   * @param chatId 대화계정이 조회될 대화의 아이디
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get('/:chatId/accounts')
  public async getChatAccountList(
      @Param('chatId', ParseIntPipe) chatId: number,
      @Query('f', ParseFilterPipe) chatAccount: ChatAccountDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(chatAccount);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.chatService.getChatAccountList(chatId, chatAccount, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatId, f: chatAccount, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
}
  
  /**
   * 대화내용 등록
   * 
   * @param chatId 대화내용이 등록될 대화의 아이디
   * @param chat 등록할 대화내용의 데이터
   */
  @Post('/:chatId/contents')
  public async registerChatContent(@Param('chatId') chatId: number, @Body('chat-content') chatContent: ChatContentDTO) {
    try {
      this.logger.debug(chatContent);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.chatService.registerChatContent(chatId, chatContent));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatContent }, error: error.message });
    }
  }

  /**
   * 대화내용 수정
   * 
   * @param chatId 대화내용이 수정될 대화의 아이디
   * @param chatContentId 수정할 대화내용의 아이디
   * @param chatContent 수정할 대화내용의 데이터
   */
  @Put('/:chatId/contents/:chatContentId')
  public async modifyChatContent(
      @Param('chatId') chatId: number, @Param('chatContentId') chatContentId: number, @Body('chat-content') chatContent: ChatContentDTO) {
    try {
      this.logger.debug(chatContent);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.chatService.modifyChatContent(chatId, chatContentId, chatContent));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatContentId, chatContent }, error: error.message });
    }
  }

  /**
   * 대화내용 삭제
   * 
   * @param chatId 대화내용이 삭제될 대화의 아이디
   * @param chatContentId 삭제할 대화내용의 아이디
   */
  @Delete('/:chatId/contents/:chatContentId')
  public async removeChatContent(@Param('chatId') chatId: number, @Param('chatContentId') chatContentId: number) {
    try {
      this.logger.debug(chatContentId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.chatService.removeChatContent(chatId, chatContentId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatContentId }, error: error.message });
    }
  }

  /**
   * 대화내용 단일 조회
   * 
   * @param chatId 대화내용이 조회될 대화의 아이디
   * @param chatContentId 조회할 대화내용의 아이디
   */
  @Get('/:chatId/contents/:chatContentId')
  public async getChatContentOne(@Param('chatId') chatId: number, @Param('chatContentId') chatContentId: number) {
    try {
      this.logger.debug(chatContentId);

      const result = await this.chatService.getChatContentOne(chatId, chatContentId);
      
      if (result.chatContent) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { chatContentId }, error: error.message });
    }
  }

  /**
   * 대화내용 리스트 조회
   * 
   * @param chatId 대화내용이 조회될 대화의 아이디
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get('/:chatId/contents')
  public async getChatContentList(
      @Param('chatId', ParseIntPipe) chatId: number,
      @Query('f', ParseFilterPipe) chatContent: ChatContentDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(chatContent);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.chatService.getChatContentList(chatId, chatContent, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: chatContent, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
