import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, DefaultScope } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { GymModel } from '@/models/gym-model';

/**
 * 공지사항 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'notice',
  timestamps: true,
})
@DefaultScope({
  attributes: ['noticeId', 'title', 'content', 'status', 'gymId', 'writerId'],
})
export class NoticeModel extends Model<NoticeModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('공지사항 아이디')
  @Column(DataType.INTEGER)
  noticeId!: number;

  @AllowNull(false)
  @Comment('제목')
  @Column(DataType.STRING(128))
  title!: string;

  @Comment('내용')
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Default('Y')
  @Comment('상태')
  @Column(DataType.CHAR(1))
  status!: string;

  @Comment('헬스장 아이디')
  @Column(DataType.INTEGER)
  gymId!: number;

  @BelongsTo(() => GymModel, 'gymId')
  gym!: GymModel;

  @AllowNull(false)
  @Comment('작성자 아이디')
  @Column(DataType.STRING(64))
  writerId!: string;

  @BelongsTo(() => AccountModel, 'writerId')
  writer!: AccountModel;

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
