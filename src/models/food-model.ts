import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, DefaultScope, BelongsToMany } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { DietModel } from '@/models/diet-model';
import { DietFoodModel } from '@/models/diet-food-model';

/**
 * 음식 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'food',
  timestamps: true,
})
@DefaultScope({
  attributes: ['foodId', 'name', 'calory', 'image', 'status', 'writerId'],
})
export class FoodModel extends Model<FoodModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('음식 아이디')
  @Column(DataType.INTEGER)
  foodId!: number;

  @AllowNull(false)
  @Comment('이름')
  @Column(DataType.STRING(128))
  name!: string;

  @Comment('칼로리')
  @Column(DataType.INTEGER)
  calory!: number;

  @Comment('이미지')
  @Column(DataType.STRING(256))
  image!: number;

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

  @BelongsToMany(() => DietModel, () => DietFoodModel)
  diets?: DietModel[];

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
