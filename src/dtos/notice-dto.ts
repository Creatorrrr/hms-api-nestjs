import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 공지사항 DTO
 */
export class NoticeDTO extends AbstractCommonDto {

  @IsInt()
  public readonly noticeId: number;

  @IsString()
  public readonly title: string;

  @IsString()
  public readonly content: string;

  @IsString()
  public readonly status: string;

  @IsString()
  public readonly gymId: string;

  @IsString()
  public readonly writerId: string;

}
