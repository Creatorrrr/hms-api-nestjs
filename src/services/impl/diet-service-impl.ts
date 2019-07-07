import { DietModel } from '@/models/diet-model';
import { DietDTO } from '@/dtos/diet-dto';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { DietService } from '../diet-service';
import { Op } from 'sequelize';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 식단 서비스 구현
 */
@Injectable()
export class DietServiceImpl extends AbstractCommonService implements DietService {
    
  constructor() {
    super();
    this.logger.debug('DietService created');
  }

  public async registerDiet(diet: DietDTO) {
    return { registered: await DietModel.create(diet) };
  }

  public async modifyDiet(dietId: number, diet: DietDTO) {
    const result = (await DietModel.update(diet, { where: { dietId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeDiet(dietId: number) {
    const result = await DietModel.destroy({ where: { dietId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getDietOne(dietId: number) {
    return { diet: await DietModel.findByPk(dietId) };
  }

  public async getDietList(diet: DietDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: diet.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { diets: await DietModel.findAll({ where, limit, offset }) };
  }

}
