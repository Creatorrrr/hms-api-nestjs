import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { DietServiceImpl } from '@/services/impl/diet-service-impl';
import { DietDTO } from '@/dtos/diet-dto';
import { DietService } from '@/services/diet-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 식단 API 컨트롤러
 */
@Controller('/api/diets')
export class DietController extends AbstractCommonController {

  constructor(@Inject( DietServiceImpl ) private readonly dietService: DietService) {
    super();
    this.logger.debug('DietController created');
  }
  
  /**
   * 식단 등록
   * 
   * @param diet 등록할 식단의 데이터
   */
  @Post()
  public async registerDiet(@Body('diet') diet: DietDTO) {
    try {
      this.logger.debug(diet);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.dietService.registerDiet(diet));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { diet }, error: error.message });
    }
  }

  /**
   * 식단 수정
   * 
   * @param dietId 수정할 식단의 아이디
   * @param diet 수정할 식단의 데이터
   */
  @Put('/:dietId')
  public async modifyDiet(@Param('dietId') dietId: number, @Body('diet') diet: DietDTO) {
    try {
      this.logger.debug(diet);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.dietService.modifyDiet(dietId, diet));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { dietId, diet }, error: error.message });
    }
  }

  /**
   * 식단 삭제
   * 
   * @param dietId 삭제할 식단의 아이디
   */
  @Delete('/:dietId')
  public async removeDiet(@Param('dietId') dietId: number) {
    try {
      this.logger.debug(dietId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.dietService.removeDiet(dietId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { dietId }, error: error.message });
    }
  }

  /**
   * 식단 단일 조회
   * 
   * @param id 조회할 식단의 아이디
   */
  @Get('/:dietId')
  public async getDietOne(@Param('dietId') dietId: number) {
    try {
      this.logger.debug(dietId);

      const result = await this.dietService.getDietOne(dietId);
      
      if (result.diet) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { dietId }, error: error.message });
    }
  }

  /**
   * 식단 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getDietList(
      @Query('f', ParseFilterPipe) diet: DietDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(diet);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);
      
      return this.makeResult(ResultTypes.SUCCESS_GET, await this.dietService.getDietList(diet, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: diet, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
