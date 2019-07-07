import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsInt, IsString } from 'class-validator';

/**
 * 헬스장 DTO
 */
export class GymDTO extends AbstractCommonDto {

  @IsInt()
  public readonly gymId: number;

  @IsString()
  public readonly name: string;
  
  @IsString()
  public readonly description: string;
  
  @IsString()
  public readonly status: string;
  
  @IsString()
  public readonly ownerId: string;

}
