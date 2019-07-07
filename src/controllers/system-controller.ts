import { Controller, Post, Get, Delete, Put, Body, Param, Query, Inject, ParseIntPipe } from '@nestjs/common';
import { ResultTypes } from '@/constants/result-types-constant';
import { AbstractCommonController } from '@/controllers/abstract-common-controller';

/**
 * 시스템 상태 컨트롤러
 */
@Controller('/api/system')
export class SystemController extends AbstractCommonController {

  constructor() {
      super();
      this.logger.debug('SystemController created');
  }

  /**
   * 시스템 헬스 체크
   */
  @Get('/health')
  public async getHealth() {
    return true;
  }

  /**
   * 테스트
   */
  @Get('/test')
  public async getTest() {
    return 'test';
  }

}
