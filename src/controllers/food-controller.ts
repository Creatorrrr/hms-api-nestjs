import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { FoodServiceImpl } from '@/services/impl/food-service-impl';
import { FoodDTO } from '@/dtos/food-dto';
import { FoodService } from '@/services/food-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 음식 API 컨트롤러
 */
@Controller('/api/foods')
export class FoodController extends AbstractCommonController {

  constructor(@Inject( FoodServiceImpl ) private readonly foodService: FoodService) {
    super();
    this.logger.debug('FoodController created');
  }
  
  /**
   * 음식 등록
   * 
   * @param food 등록할 음식의 데이터
   */
  @Post()
  public async registerFood(@Body('food') food: FoodDTO) {
    try {
      this.logger.debug(food);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.foodService.registerFood(food));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { food }, error: error.message });
    }
  }

  /**
   * 음식 수정
   * 
   * @param foodId 수정할 음식의 아이디
   * @param food 수정할 음식의 데이터
   */
  @Put('/:foodId')
  public async modifyFood(@Param('foodId') foodId: number, @Body('food') food: FoodDTO) {
    try {
      this.logger.debug(food);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.foodService.modifyFood(foodId, food));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { foodId, food }, error: error.message });
    }
  }

  /**
   * 음식 삭제
   * 
   * @param foodId 삭제할 음식의 아이디
   */
  @Delete('/:foodId')
  public async removeFood(@Param('foodId') foodId: number) {
    try {
      this.logger.debug(foodId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.foodService.removeFood(foodId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { foodId }, error: error.message });
    }
  }

  /**
   * 음식 단일 조회
   * 
   * @param id 조회할 음식의 아이디
   */
  @Get('/:foodId')
  public async getFoodOne(@Param('foodId') foodId: number) {
    try {
      this.logger.debug(foodId);

      const result = await this.foodService.getFoodOne(foodId);
      
      if (result.food) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { foodId }, error: error.message });
    }
  }

  /**
   * 음식 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getFoodList(
      @Query('f', ParseFilterPipe) food: FoodDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(food);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.foodService.getFoodList(food, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: food, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
