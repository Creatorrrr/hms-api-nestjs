import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsString, IsInt } from 'class-validator';

/**
 * 음식 DTO
 */
export class FoodDTO extends AbstractCommonDto {

  @IsInt()
  public readonly foodId: number;

  @IsString()
  public readonly name: string ;

  @IsInt()
  public readonly calory: number;

  @IsString()
  public readonly image: string;

  @IsString()
  public readonly status: string;

  @IsString()
  public readonly writerId: string;

}
