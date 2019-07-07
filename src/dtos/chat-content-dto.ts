import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 대화내용 DTO
 */
export class ChatContentDTO extends AbstractCommonDto {

  @IsInt()
  public readonly chatContentId: number;

  @IsString()
  public readonly content: string;

  @IsString()
  public readonly writerId: string;

  @IsInt()
  public readonly chatId: number;

}
