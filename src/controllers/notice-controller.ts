import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { NoticeDTO } from '@/dtos/notice-dto';
import { NoticeServiceImpl } from '@/services/impl/notice-service-impl';
import { NoticeService } from '@/services/notice-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 공지사항 API 컨트롤러
 */
@Controller('/api/notices')
export class NoticeController extends AbstractCommonController {

  constructor(@Inject( NoticeServiceImpl ) private readonly noticeService: NoticeService) {
    super();
    this.logger.debug('NoticeController created');
  }
  
  /**
   * 공지사항 등록
   * 
   * @param notice 등록할 공지사항의 데이터
   */
  @Post()
  public async registerNotice(@Body('notice') notice: NoticeDTO) {
    try {
      this.logger.debug(notice);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.noticeService.registerNotice(notice));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { notice }, error: error.message });
    }
  }

  /**
   * 공지사항 수정
   * 
   * @param noticeId 수정할 공지사항의 아이디
   * @param notice 수정할 공지사항의 데이터
   */
  @Put('/:noticeId')
  public async modifyNotice(@Param('noticeId') noticeId: number, @Body('notice') notice: NoticeDTO) {
    try {
      this.logger.debug(notice);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.noticeService.modifyNotice(noticeId, notice));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { noticeId, notice }, error: error.message });
    }
  }

  /**
   * 공지사항 삭제
   * 
   * @param noticeId 삭제할 공지사항의 아이디
   */
  @Delete('/:noticeId')
  public async removeNotice(@Param('noticeId') noticeId: number) {
    try {
      this.logger.debug(noticeId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.noticeService.removeNotice(noticeId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { noticeId }, error: error.message });
    }
  }

  /**
   * 공지사항 단일 조회
   * 
   * @param id 조회할 공지사항의 아이디
   */
  @Get('/:noticeId')
  public async getNoticeOne(@Param('noticeId') noticeId: number) {
    try {
      this.logger.debug(noticeId);

      const result = await this.noticeService.getNoticeOne(noticeId);
      
      if (result.notice) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { noticeId }, error: error.message });
    }
  }

  /**
   * 공지사항 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getNoticeList(
      @Query('f', ParseFilterPipe) notice: NoticeDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(notice);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.noticeService.getNoticeList(notice, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: notice, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
