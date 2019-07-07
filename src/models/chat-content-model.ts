import { Table, Column, Model, DataType, PrimaryKey, Comment, AllowNull, Default, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, DefaultScope, ForeignKey } from 'sequelize-typescript';
import { AccountModel } from '@/models/account-model';
import { ChatModel } from '@/models/chat-model';

/**
 * 대화 내용 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'chat_content',
  timestamps: true,
})
@DefaultScope({
  attributes: ['chatContentId', 'content', 'writerId'],
})
export class ChatContentModel extends Model<ChatContentModel> {

  @PrimaryKey
  @AutoIncrement
  @Comment('대화 내용 아이디')
  @Column(DataType.INTEGER)
  chatContentId!: number;

  @Comment('내용')
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Comment('작성자 아이디')
  @Column(DataType.STRING(64))
  writerId!: string;

  @BelongsTo(() => AccountModel, 'writerId')
  writer!: AccountModel;

  @ForeignKey(() => ChatModel)
  @Comment('대화 아이디')
  @Column(DataType.INTEGER)
  chatId!: number;

  @BelongsTo(() => ChatModel, 'chatId')
  chat!: ChatModel;

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
