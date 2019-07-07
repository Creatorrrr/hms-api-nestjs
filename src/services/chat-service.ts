import { ChatDTO } from "@/dtos/chat-dto";
import { ChatAccountDTO } from "@/dtos/chat-account-dto";
import { ChatContentDTO } from "@/dtos/chat-content-dto";
import { ChatModel } from "@/models/chat-model";
import { ChatAccountModel } from "@/models/chat-account-model";
import { ChatContentModel } from "@/models/chat-content-model";

/**
 * 대화 서비스
 */
export interface ChatService {

  /**
   * 대화 등록
   * 
   * @param chat 등록할 대화의 데이터
   */
  registerChat(chat: ChatDTO): Promise<{ registered: ChatModel }>;

  /**
   * 대화 수정
   * 
   * @param chatId 수정할 대화의 아이디
   * @param chat 수정할 대화의 데이터
   */
  modifyChat(chatId: number, chat: ChatDTO): Promise<{ modified: number }>;

  /**
   * 대화 삭제
   * 
   * @param chatId 삭제할 대화의 아이디
   */
  removeChat(chatId: number): Promise<{ removed: number }>;

  /**
   * 대화 단일 조회
   * 
   * @param chatId 조회할 대화의 아이디
   */
  getChatOne(chatId: number): Promise<{ chat: ChatModel }>;

  /**
   * 대화 리스트 조회
   * 
   * @param chat 검색 조건
   */
  getChatList(chat: ChatDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ chats: ChatModel[] }>;

  /**
   * 대화계정 등록
   * 
   * @param chatId 대화계정이 등록될 대화의 아이디
   * @param chatAccount 등록할 대화계정의 데이터
   */
  registerChatAccount(chatId: number, chatAccount: ChatAccountDTO): Promise<{ registered: ChatAccountModel }>;

  /**
   * 대화계정 수정
   * 
   * @param chatId 대화계정이 수정될 대화의 아이디
   * @param accountId 대화계정이 수정될 계정의 아이디
   * @param chatAccount 수정할 대화계정 데이터
   */
  modifyChatAccount(chatId: number, accountId: number, chatAccount: ChatAccountDTO): Promise<{ modified: number }>;

  /**
   * 대화계정 삭제
   * 
   * @param chatId 대화계정이 등록될 대화의 아이디
   * @param accountId 대화계정이 삭제될 계정의 아이디
   */
  removeChatAccount(chatId: number, accountId: number): Promise<{ removed: number }>;

  /**
   * 대화계정 단일 조회
   * 
   * @param chatId 대화계정이 등록될 대화의 아이디
   * @param accountId 대화계정이 삭제될 계정의 아이디
   */
  getChatAccountOne(chatId: number, accountId: number): Promise<{ chatAccount: ChatAccountModel }>;

  /**
   * 대화계정 리스트 조회
   * 
   * @param chatId 대화계정이 등록될 대화의 아이디
   * @param chatAccount 검색 조건
   */
  getChatAccountList(chatId: number, chatAccount: ChatAccountDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ chatAccounts: ChatAccountModel[] }>;

  /**
   * 대화내용 등록
   * 
   * @param chatId 대화내용이 등록될 대화의 아이디
   * @param chatContent 등록할 대화내용의 데이터
   */
  registerChatContent(chatId: number, chatContent: ChatContentDTO): Promise<{ registered: ChatContentModel }>;

  /**
   * 대화내용 수정
   * 
   * @param chatId 대화내용이 수정될 대화의 아이디
   * @param chatContentId 수정할 대화내용의 아이디
   * @param chatContent 수정할 대화내용 데이터
   */
  modifyChatContent(chatId: number, chatContentId: number, chatContent: ChatContentDTO): Promise<{ modified: number }>;

  /**
   * 대화내용 삭제
   * 
   * @param chatId 대화내용이 등록될 대화의 아이디
   * @param chatContentId 삭제할 대화내용의 아이디
   */
  removeChatContent(chatId: number, chatContentId: number): Promise<{ removed: number }>;

  /**
   * 대화내용 단일 조회
   * 
   * @param chatId 대화내용이 등록될 대화의 아이디
   * @param chatContentId 조회할 대화내용의 아이디
   */
  getChatContentOne(chatId: number, chatContentId: number): Promise<{ chatContent: ChatContentModel }>;

  /**
   * 대화내용 리스트 조회
   * 
   * @param chatId 대화내용이 등록될 대화의 아이디
   * @param chatContent 검색 조건
   */
  getChatContentList(chatId: number, chatContent: ChatContentDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ chatContents: ChatContentModel[] }>;

}