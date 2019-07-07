import { Table, Column, Model, DataType, PrimaryKey, Comment, Default, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { GymModel } from '@/models/gym-model';

/**
 * 계정-헬스장(트레이너) DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'account_gym_trainer',
})
export class AccountGymTrainerModel extends Model<AccountGymTrainerModel> {

  @PrimaryKey
  @ForeignKey(() => AccountModel)
  @Comment('계정 아이디')
  @Column(DataType.STRING(64))
  accountId!: string;

  @PrimaryKey
  @ForeignKey(() => GymModel)
  @Comment('헬스장 아이디')
  @Column(DataType.INTEGER)
  gymId!: number;

  @Comment('생성자')
  @Default('system')
  @Column(DataType.STRING(64))
  creatorId?: string;

  @CreatedAt
  @Comment('생성시간')
  @Column(DataType.DATE)
  createdTime?: Date;

  @Comment('최종수정자')
  @Default('system')
  @Column(DataType.STRING(64))
  lastModifierId?: string;

  @UpdatedAt
  @Comment('최종수정시간')
  @Column(DataType.DATE)
  lastModifiedTime?: Date;

}
