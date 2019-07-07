import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, `../../../global-development.env`) });
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '@/controllers/account-controller';
import { AccountServiceImpl } from '@/services/impl/account-service-impl';
import { AccountDTO } from '@/dtos/account-dto';
import { ResultTypes } from '@/constants/result-types-constant';
import { sequelize } from '@/configs/sequelize-config';
import { AccountModel } from '@/models/account-model';

describe('AccountController', () => {
  let accountController: AccountController;

  let accountId;

  beforeEach(async () => {
    await sequelize.sync();
    
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountServiceImpl],
    }).compile();

    accountController = testingModule.get(AccountController);
  });

  describe('registerAccount', () => {
    it('should return registered account', async () => {
      const account = Object.assign(new AccountDTO(), {
        accountId: 'accountTest',
        name: '계정테스트',
        password: 'test',
        type:'M',
        status: 'Y',
      });

      const result = await accountController.registerAccount(account);

      accountId = (result.result.registered as AccountModel).getDataValue('accountId');

      expect(result.status).toBe(ResultTypes.SUCCESS_REGISTER.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_REGISTER.$message);
      expect(result.result.registered).toBeDefined();
    });
  });

  describe('getAccountOne', () => {
    it('should return account', async () => {
      const result = await accountController.getAccountOne(accountId);

      expect(result.status).toBe(ResultTypes.SUCCESS_GET.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_GET.$message);
      expect(result.result.account).toBeDefined();
    });
  });

  describe('getAccountList', () => {
    it('should return account list', async () => {
      const account = Object.assign(new AccountDTO(), { name:'계정테스트' });
      const result = await accountController.getAccountList(account, undefined, undefined, 10, 0);

      expect(result.status).toBe(ResultTypes.SUCCESS_GET.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_GET.$message);
      expect(result.result.accounts.length).toBeGreaterThan(0);
    });
  });

  describe('modifyAccount', () => {
    it('should return modified count', async () => {
      const account = Object.assign(new AccountDTO(), {
        name: '계정테스트1',
        password: 'test',
        type:'M',
        status: 'Y',
      });

      const result = await accountController.modifyAccount(accountId, account);

      expect(result.status).toBe(ResultTypes.SUCCESS_MODIFY.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_MODIFY.$message);
      expect(result.result.modified).toBeGreaterThan(0);
    });
  });

  describe('removeAccount', () => {
    it('should return removed count', async () => {
      const result = await accountController.removeAccount(accountId);

      expect(result.status).toBe(ResultTypes.SUCCESS_REMOVE.$status);
      expect(result.message).toBe(ResultTypes.SUCCESS_REMOVE.$message);
      expect(result.result.removed).toBeGreaterThan(0);
    });
  });

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });
});
