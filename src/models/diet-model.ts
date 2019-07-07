import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, DefaultScope, BelongsToMany } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { FoodModel } from '@/models/food-model';
import { DietFoodModel } from '@/models/diet-food-model';

/**
 * 식단 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'diet',
  timestamps: true,
})
@DefaultScope({
  attributes: ['dietId', 'memo', 'status', 'writerId'],
})
export class DietModel extends Model<DietModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('식단 아이디')
  @Column(DataType.INTEGER)
  dietId!: number;

  @AllowNull(false)
  @Comment('메모')
  @Column(DataType.STRING(1024))
  memo!: string;

  @AllowNull(false)
  @Default('Y')
  @Comment('상태')
  @Column(DataType.CHAR(1))
  status!: string;

  @Comment('작성자 아이디')
  @Column(DataType.STRING(64))
  writerId!: string;

  @BelongsTo(() => AccountModel, 'writerId')
  writer!: AccountModel;

  @BelongsToMany(() => FoodModel, () => DietFoodModel)
  foods?: FoodModel[];

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
