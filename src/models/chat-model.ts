import { Table, Column, Model, DataType, PrimaryKey, Comment, Default, CreatedAt, UpdatedAt, AutoIncrement, DefaultScope, BelongsToMany, HasMany, AllowNull } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { ChatAccountModel } from '@/models/chat-account-model';
import { ChatContentModel } from '@/models/chat-content-model';

/**
 * 대화 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'chat',
  timestamps: true,
})
@DefaultScope({
  attributes: ['chatId', 'title'],
})
export class ChatModel extends Model<ChatModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('대화 아이디')
  @Column(DataType.INTEGER)
  chatId!: number;

  @AllowNull(false)
  @Comment('제목')
  @Column(DataType.STRING(128))
  title!: string;

  @BelongsToMany(() => AccountModel, () => ChatAccountModel)
  accounts!: AccountModel[];

  @HasMany(() => ChatContentModel)
  chatContents!: ChatContentModel[];

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
