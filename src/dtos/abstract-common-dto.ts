import { Utils } from 'sequelize';
import { CommonUtil } from '@/utils/common-util';

/**
 * DTO 공통 추상 클래스
 */
export abstract class AbstractCommonDto {
  
  public creatorId: string;
  public createdTime: Date | Utils.Literal;
  public lastModifierId: string;
  public lastModifiedTime: Date | Utils.Literal;

  public toObject() {
    return CommonUtil.toObject(this);
  }

}
