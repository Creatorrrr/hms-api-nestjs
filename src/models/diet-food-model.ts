import { Table, Column, Model, DataType, PrimaryKey, Comment, Default, CreatedAt, UpdatedAt, DefaultScope, ForeignKey } from 'sequelize-typescript';
import { FoodModel } from '@/models/food-model';
import { DietModel } from '@/models/diet-model';

/**
 * 식단-음식 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'diet_food',
  timestamps: true,
})
@DefaultScope({
  attributes: ['dietId', 'foodId'],
})
export class DietFoodModel extends Model<DietFoodModel> {

  @PrimaryKey
  @ForeignKey(() => DietModel)
  @Comment('식단 아이디')
  @Column(DataType.INTEGER)
  dietId!: number;

  @PrimaryKey
  @ForeignKey(() => FoodModel)
  @Comment('음식 아이디')
  @Column(DataType.INTEGER)
  foodId!: number;

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
