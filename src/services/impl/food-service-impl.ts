import { FoodModel } from '@/models/food-model';
import { FoodDTO } from '@/dtos/food-dto';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { FoodService } from '../food-service';
import { Op } from 'sequelize';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 음식 서비스 구현
 */
@Injectable()
export class FoodServiceImpl extends AbstractCommonService implements FoodService {
    
  constructor() {
    super();
    this.logger.debug('FoodService created');
  }

  public async registerFood(food: FoodDTO) {
    return { registered: await FoodModel.create(food) };
  }

  public async modifyFood(foodId: number, food: FoodDTO) {
    const result = (await FoodModel.update(food, { where: { foodId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeFood(foodId: number) {
    const result = await FoodModel.destroy({ where: { foodId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getFoodOne(foodId: number) {
    return { food: await FoodModel.findByPk(foodId) };
  }

  public async getFoodList(food: FoodDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: food.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { foods: await FoodModel.findAll({ where, limit, offset }) };
  }

}
