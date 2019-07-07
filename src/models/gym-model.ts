import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { AccountGymTrainerModel } from '@/models/account-gym-trainer-model';
import { AccountGymMemberModel } from '@/models/account-gym-member-model';

/**
 * 헬스장 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'gym',
  timestamps: true,
})
@DefaultScope({
  attributes: ['gymId', 'name', 'description', 'status', 'ownerId'],
})
export class GymModel extends Model<GymModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('헬스장 아이디')
  @Column(DataType.INTEGER)
  gymId!: number;

  @AllowNull(false)
  @Comment('이름')
  @Column(DataType.STRING(128))
  name!: string;

  @Comment('설명')
  @Column(DataType.STRING(1024))
  description!: string;

  @AllowNull(false)
  @Default('Y')
  @Comment('상태')
  @Column(DataType.CHAR(1))
  status!: string;

  @Comment('소유자 아이디')
  @Column(DataType.STRING(64))
  ownerId!: string;

  @BelongsTo(() => AccountModel, 'ownerId')
  owner!: AccountModel;

  @BelongsToMany(() => AccountModel, () => AccountGymTrainerModel)
  trainers?: AccountModel[];

  @BelongsToMany(() => AccountModel, () => AccountGymMemberModel)
  members?: AccountModel[];

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
