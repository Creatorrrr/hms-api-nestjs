import { Table, Column, Model, DataType, PrimaryKey, Comment, Default, CreatedAt, UpdatedAt, DefaultScope, ForeignKey } from 'sequelize-typescript';
import { ChatModel } from '@/models/chat-model';
import { AccountModel } from '@/models/account-model';

/**
 * 계정-대화 DAO
 * ORM 정의 (어플리케이션 최초 동작 시 테이블 자동 생성)
 */
@Table({
  tableName: 'account_chat',
  timestamps: true,
})
@DefaultScope({
  attributes: ['accountId', 'chatId'],
})
export class ChatAccountModel extends Model<ChatAccountModel> {

  @PrimaryKey
  @ForeignKey(() => ChatModel)
  @Comment('대화 아이디')
  @Column(DataType.INTEGER)
  chatId!: number;

  @PrimaryKey
  @ForeignKey(() => AccountModel)
  @Comment('계정 아이디')
  @Column(DataType.INTEGER)
  accountId!: number;

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
