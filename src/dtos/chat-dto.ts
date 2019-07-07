import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 대화 DTO
 */
export class ChatDTO extends AbstractCommonDto {

  @IsInt()
  public readonly chatId: number;

  @IsString()
  public readonly title: string;

}
