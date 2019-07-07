import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { HealthDiaryServiceImpl } from '@/services/impl/health-diary-service-impl';
import { HealthDiaryDTO } from '@/dtos/health-diary-dto';
import { HealthDiaryService } from '@/services/health-diary-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 운동일기 API 컨트롤러
 */
@Controller('/api/health-diaries')
export class HealthDiaryController extends AbstractCommonController {

  constructor(@Inject( HealthDiaryServiceImpl ) private readonly healthDiaryService: HealthDiaryService) {
    super();
    this.logger.debug('HealthDiaryController created');
  }
  
  /**
   * 운동일기 등록
   * 
   * @param healthDiary 등록할 운동일기의 데이터
   */
  @Post()
  public async registerHealthDiary(@Body('health-diary') healthDiary: HealthDiaryDTO) {
    try {
      this.logger.debug(healthDiary);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.healthDiaryService.registerHealthDiary(healthDiary));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { healthDiary }, error: error.message });
    }
  }

  /**
   * 운동일기 수정
   * 
   * @param healthDiaryId 수정할 운동일기의 아이디
   * @param healthDiary 수정할 운동일기의 데이터
   */
  @Put('/:healthDiaryId')
  public async modifyHealthDiary(@Param('healthDiaryId') healthDiaryId: number, @Body('health-diary') healthDiary: HealthDiaryDTO) {
    try {
      this.logger.debug(healthDiary);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.healthDiaryService.modifyHealthDiary(healthDiaryId, healthDiary));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { healthDiaryId, healthDiary }, error: error.message });
    }
  }

  /**
   * 운동일기 삭제
   * 
   * @param healthDiaryId 삭제할 운동일기의 아이디
   */
  @Delete('/:healthDiaryId')
  public async removeHealthDiary(@Param('healthDiaryId') healthDiaryId: number) {
    try {
      this.logger.debug(healthDiaryId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.healthDiaryService.removeHealthDiary(healthDiaryId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { healthDiaryId }, error: error.message });
    }
  }

  /**
   * 운동일기 단일 조회
   * 
   * @param id 조회할 운동일기의 아이디
   */
  @Get('/:healthDiaryId')
  public async getHealthDiaryOne(@Param('healthDiaryId') healthDiaryId: number) {
    try {
      this.logger.debug(healthDiaryId);

      const result = await this.healthDiaryService.getHealthDiaryOne(healthDiaryId);
      
      if (result.healthDiary) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { healthDiaryId }, error: error.message });
    }
  }

  /**
   * 운동일기 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getHealthDiaryList(
      @Query('f', ParseFilterPipe) healthDiary: HealthDiaryDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(healthDiary);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.healthDiaryService.getHealthDiaryList(healthDiary, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: healthDiary, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
