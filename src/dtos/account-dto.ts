import { AbstractCommonDto } from '@/dtos/abstract-common-dto';
import { IsString } from 'class-validator';

/**
 * 계정 DTO
 */
export class AccountDTO extends AbstractCommonDto {

  @IsString()
  public readonly accountId: string;
  
  @IsString()
  public readonly password: string;
  
  @IsString()
  public readonly name: string;
  
  @IsString()
  public readonly type: string;
  
  @IsString()
  public readonly status: string;

}
