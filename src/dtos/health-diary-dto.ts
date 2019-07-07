import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 운동일기 DTO
 */
export class HealthDiaryDTO extends AbstractCommonDto {

  @IsInt()
  public readonly healthDiaryId: number;
  
  @IsString()
  public readonly title: string;
  
  @IsString()
  public readonly content: string;
  
  @IsString()
  public readonly status: string;
  
  @IsString()
  public readonly writerId: string;

}
