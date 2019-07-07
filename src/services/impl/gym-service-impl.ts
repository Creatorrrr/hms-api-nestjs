import { GymModel } from '@/models/gym-model';
import { GymDTO } from '@/dtos/gym-dto';
import { AccountModel } from '@/models/account-model';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { GymService } from '@/services/gym-service';
import { Op } from 'sequelize';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 헬스장 서비스 구현
 */
@Injectable()
export class GymServiceImpl extends AbstractCommonService implements GymService {
    
  constructor() {
    super();
    this.logger.debug('GymService created');
  }

  public async registerGym(gym: GymDTO) {
    return { registered: await GymModel.create(gym) };
  }

  public async modifyGym(gymId: number, gym: GymDTO) {
    const result = (await GymModel.update(gym, { where: { gymId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeGym(gymId: number) {
    const result = await GymModel.destroy({ where: { gymId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getGymOne(gymId: number) {
    return { gym: await GymModel.findByPk(gymId) };
  }

  public async getGymOneWithOwner(gymId: number) {
    return { gym: await GymModel.findByPk(gymId,
      { include: [ { model: AccountModel, as: 'trainers' }, { model: AccountModel, as: 'members' } ] }) };
  }

  public async getGymList(gym: GymDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: gym.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { gyms: await GymModel.findAll({ where, limit, offset }) };
  }

}
