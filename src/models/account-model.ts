import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { GymModel } from '@/models/gym-model';
import { AccountGymTrainerModel } from '@/models/account-gym-trainer-model';
import { AccountGymMemberModel } from '@/models/account-gym-member-model';
import { ChatModel } from '@/models/chat-model';
import { ChatAccountModel } from '@/models/chat-account-model';

/**
 * 계정 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'account',
  timestamps: true,
})
@DefaultScope({
  attributes: ['accountId', 'name', 'type', 'status'],
})
export class AccountModel extends Model<AccountModel> {

  @PrimaryKey
  @Comment('계정 아이디')
  @Column(DataType.STRING(64))
  accountId!: string;

  @Comment('패스워드')
  @Column(DataType.STRING(256))
  password!: string;

  @AllowNull(false)
  @Comment('이름')
  @Column(DataType.STRING(128))
  name!: string;

  @AllowNull(false)
  @Comment('계정 종류')
  @Column(DataType.CHAR(1))
  type!: string;

  @AllowNull(false)
  @Default('Y')
  @Comment('상태')
  @Column(DataType.CHAR(1))
  status!: string;

  @BelongsToMany(() => GymModel, () => AccountGymTrainerModel)
  trainerGyms?: GymModel[];

  @BelongsToMany(() => GymModel, () => AccountGymMemberModel)
  memberGyms?: GymModel[];

  @BelongsToMany(() => ChatModel, () => ChatAccountModel)
  chats?: ChatModel[];

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
