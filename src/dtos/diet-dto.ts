import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 식단 DTO
 */
export class DietDTO extends AbstractCommonDto {

  @IsInt()
  public readonly dietId: number;

  @IsString()
  public readonly memo: string;

  @IsString()
  public readonly status: string;

  @IsString()
  public readonly writerId: string;

}
