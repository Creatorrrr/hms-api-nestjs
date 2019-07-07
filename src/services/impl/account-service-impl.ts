import { sequelize } from '@/configs/sequelize-config';
import { AccountModel } from '@/models/account-model';
import { AccountDTO } from '@/dtos/account-dto';
import { GymModel } from '@/models/gym-model';
import { Transaction, Op } from 'sequelize';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { AccountService } from '@/services/account-service';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 계정 서비스 구현
 */
@Injectable()
export class AccountServiceImpl extends AbstractCommonService implements AccountService {

  constructor() {
    super();
    this.logger.debug('AccountService created');
  }

  public async registerAccount(account: AccountDTO) {
    return { registered: await AccountModel.create(account) };
  }

  public async registerAccountTransactionally(account: AccountDTO) {
    return { registered: await sequelize.transaction((t: Transaction) => {
      return AccountModel.create(account, { transaction: t });
    }) };
  }

  public async modifyAccount(accountId: string, account: AccountDTO) {
    const result = (await AccountModel.update(account, { where: { accountId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeAccount(accountId: string) {
    const result = await AccountModel.destroy({ where: { accountId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getAccountOne(accountId: string) {
    return { account: await AccountModel.findByPk(accountId) };
  }

  public async getAccountOneWithPassword(accountId: string) {
    return { account: await AccountModel.findByPk(accountId, { attributes: ['accountId', 'password', 'name', 'type', 'status'] }) };
  }

  public async getAccountOneWithTrainerGymsMemberGyms(accountId: string) {
    return { account: await AccountModel.findByPk(accountId,
      { include: [{ model: GymModel, as: 'trainerGyms' }, { model: GymModel, as: 'memberGyms' }] }) };
  }

  public async getAccountList(account: AccountDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: account.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { accounts: await AccountModel.findAll({ where, limit, offset }) };
  }

}
