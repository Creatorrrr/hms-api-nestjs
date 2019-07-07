import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';
import { GymServiceImpl } from '@/services/impl/gym-service-impl';
import { GymDTO } from '@/dtos/gym-dto';
import { GymService } from '@/services/gym-service';
import { ParseFilterPipe } from '@/utils/pipes/parse-filter-pipe';

/**
 * 헬스장 API 컨트롤러
 */
@Controller('/api/gyms')
export class GymController extends AbstractCommonController {

  constructor(@Inject( GymServiceImpl ) private readonly gymService: GymService) {
    super();
    this.logger.debug('GymController created');
  }
  
  /**
   * 헬스장 등록
   * 
   * @param gym 등록할 헬스장의 데이터
   */
  @Post()
  public async registerGym(@Body('gym') gym: GymDTO) {
    try {
      this.logger.debug(gym);
      return this.makeResult(ResultTypes.SUCCESS_REGISTER, await this.gymService.registerGym(gym));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { gym }, error: error.message });
    }
  }

  /**
   * 헬스장 수정
   * 
   * @param gymId 수정할 헬스장의 아이디
   * @param gym 수정할 헬스장의 데이터
   */
  @Put('/:gymId')
  public async modifyGym(@Param('gymId') gymId: number, @Body('gym') gym: GymDTO) {
    try {
      this.logger.debug(gym);
      return this.makeResult(ResultTypes.SUCCESS_MODIFY, await this.gymService.modifyGym(gymId, gym));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { gymId, gym }, error: error.message });
    }
  }

  /**
   * 헬스장 삭제
   * 
   * @param gymId 삭제할 헬스장의 아이디
   */
  @Delete('/:gymId')
  public async removeGym(@Param('gymId') gymId: number) {
    try {
      this.logger.debug(gymId);
      return this.makeResult(ResultTypes.SUCCESS_REMOVE, await this.gymService.removeGym(gymId));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { gymId }, error: error.message });
    }
  }

  /**
   * 헬스장 단일 조회
   * 
   * @param id 조회할 헬스장의 아이디
   */
  @Get('/:gymId')
  public async getGymOne(@Param('gymId') gymId: number) {
    try {
      this.logger.debug(gymId);

      const result = await this.gymService.getGymOneWithOwner(gymId);
      
      if (result.gym) return this.makeResult(ResultTypes.SUCCESS_GET, result);
      else return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY, result);
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { gymId }, error: error.message });
    }
  }

  /**
   * 헬스장 리스트 조회
   * 
   * @param query 검색 조건 쿼리
   * @param limit 검색 범위(개수)
   * @param offset 검색 시작 위치
   */
  @Get()
  public async getGymList(
      @Query('f', ParseFilterPipe) gym: GymDTO, @Query('k') keyword: string, @Query('c') column: string,
      @Query('l', ParseIntPipe) limit: number, @Query('o', ParseIntPipe) offset: number) {
    try {
      this.logger.debug(gym);
      this.logger.debug(keyword);
      this.logger.debug(column);
      this.logger.debug(limit);
      this.logger.debug(offset);

      return this.makeResult(ResultTypes.SUCCESS_GET, await this.gymService.getGymList(gym, keyword, column, limit, offset));
    } catch (error) {
      this.logger.error(error);
      return this.makeResult(this.checkError(error), { params: { f: gym, k: keyword, c: column, l: limit, o: offset }, error: error.message });
    }
  }

}
