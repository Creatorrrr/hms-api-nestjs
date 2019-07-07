import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { AccountDTO } from '@/dtos/account-dto';
import { AccountService } from '@/services/account-service';
import { AccountServiceImpl } from '@/services/impl/account-service-impl';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 계정 API 컨트롤러
 */
@Controller('/api/accounts')
export class AccountController extends AbstractCommonController {

  constructor(@Inject( AccountServiceImpl ) private readonly accountService: AccountService) {
      super();
      this.logger.debug('AccountController created');
  }
  
  /**
   * 계정 등록
   * 
   * @param account 등록할 계정의 데이터
   */
  @Post()
  public async registerAccount(@Body('account') account: AccountDTO) {
    try {
      this.logger.debug(account);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.accountService.registerAccount(account));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { account }, error: error.message });
    }
  }

  /**
   * 계정 수정
   * 
   * @param accountId 수정할 계정의 아이디
   * @param account 수정할 계정의 데이터
   */
  @Put('/:accountId')
  public async modifyAccount(@Param('accountId') accountId: string, @Body('account') account: AccountDTO) {
    try {
      this.logger.debug(account);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.accountService.modifyAccount(accountId, account));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { accountId, account }, error: error.message });
    }
  }

  /**
   * 계정 삭제
   * 
   * @param accountId 삭제할 계정의 아이디
   */
  @Delete('/:accountId')
  public async removeAccount(@Param('accountId') accountId: string) {
    try {
      this.logger.debug(accountId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.accountService.removeAccount(accountId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { accountId }, error: error.message });
    }
  }

  /**
   * 계정 단일 조회
   * 
   * @param accountId 조회할 계정의 아이디
   */
  @Get('/:accountId')
  public async getAccountOne(@Param('accountId') accountId: string) {
    try {
      this.logger.debug(accountId);

      const result = await this.accountService.getAccountOneWithTrainerGymsMemberGyms(accountId);
      
      if (result.account) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { accountId }, error: error.message });
    }
  }

  /**
   * 계정 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getAccountList(
      @Query('f', ParseFilterPipe) account: AccountDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(account);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.accountService.getAccountList(account, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: account, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
