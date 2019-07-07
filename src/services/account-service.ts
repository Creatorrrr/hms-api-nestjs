import { AccountDTO } from "@/dtos/account-dto";
import { AccountModel } from "@/models/account-model";

/**
 * 계정 서비스
 */
export interface AccountService {

  /**
   * 계정 등록
   * 
   * @param account 등록할 계정의 데이터
   */
  registerAccount(account: AccountDTO): Promise<{ registered: AccountModel }>;

  /**
   * 계정 등록 (트랜잭션)
   * 
   * @param account 등록할 계정의 데이터
   */
  registerAccountTransactionally(account: AccountDTO): Promise<{ registered: AccountModel }>;

  /**
   * 계정 수정
   * 
   * @param accountId 수정할 계정의 아이디
   * @param account 수정할 계정의 데이터
   */
  modifyAccount(accountId: string, account: AccountDTO): Promise<{ modified: number }>;

  /**
   * 계정 삭제
   * 
   * @param accountId 삭제할 계정의 아이디
   */
  removeAccount(accountId: string): Promise<{ removed: number }>;

  /**
   * 계정 단일 조회
   * 
   * @param accountId 조회할 계정의 아이디
   */
  getAccountOne(accountId: string): Promise<{ account: AccountModel }>;

  /**
   * 계정 단일 조회 (패스워드 포함)
   * 
   * @param accountId 조회할 계정의 아이디
   */
  getAccountOneWithPassword(accountId: string): Promise<{ account: AccountModel }>;

  /**
   * 계정 단일 조회 (하위 포함)
   * 
   * @param accountId 조회할 계정의 아이디
   */
  getAccountOneWithTrainerGymsMemberGyms(accountId: string): Promise<{ account: AccountModel }>;

  /**
   * 계정 리스트 조회
   * 
   * @param account 검색 조건
   */
  getAccountList(account: AccountDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ accounts: AccountModel[] }>;

}