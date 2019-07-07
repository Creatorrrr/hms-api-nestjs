import { HealthDiaryDTO } from '@/dtos/health-diary-dto';
import { HealthDiaryModel } from '@/models/health-diary-model';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { HealthDiaryService } from '../health-diary-service';
import { Op } from 'sequelize';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 운동일기 서비스 구현
 */
@Injectable()
export class HealthDiaryServiceImpl extends AbstractCommonService implements HealthDiaryService {
    
  constructor() {
    super();
    this.logger.debug('HealthDiaryService created');
  }

  public async registerHealthDiary(healthDiary: HealthDiaryDTO) {
    return { registered: await HealthDiaryModel.create(healthDiary) };
  }

  public async modifyHealthDiary(healthDiaryId: number, healthDiary: HealthDiaryDTO) {
    const result = (await HealthDiaryModel.update(healthDiary, { where: { healthDiaryId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeHealthDiary(healthDiaryId: number) {
    const result = await HealthDiaryModel.destroy({ where: { healthDiaryId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getHealthDiaryOne(healthDiaryId: number) {
    return { healthDiary: await HealthDiaryModel.findByPk(healthDiaryId) };
  }

  public async getHealthDiaryList(healthDiary: HealthDiaryDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: healthDiary.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { healthDiaries: await HealthDiaryModel.findAll({ where, limit, offset }) };
  }

}
