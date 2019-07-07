import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt } from 'class-validator';

/**
 * 대화계정 DTO
 */
export class ChatAccountDTO extends AbstractCommonDto {

  @IsInt()
  public readonly chatId: number;

  @IsInt()
  public readonly accountId: number;

}
