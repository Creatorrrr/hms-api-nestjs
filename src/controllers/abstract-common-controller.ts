import { ResultDTO } from '@/dtos/result-dto';
import { ResultType } from '@/constants/result-type-constant';
import { ResultTypes } from '@/constants/result-types-constant';
import { Logger } from '@nestjs/common';

/**
 * 컨트롤러 공통 추상 클래스
 */
export abstract class AbstractCommonController {

  protected readonly logger = new Logger(this.constructor.name);

  /**
   * 에러 체크에 사용할 에러 목록
   */
  private static readonly errorTypes = Object.values(ResultTypes).filter(resultType => resultType.$error) as ResultType[];

  /**
   * 결과값용 객체 생성
   * 안전한 객체 반환을 위해 직렬화 가능한 형태로 객체 변환
   * 
   * @param resultType 결과값의 종류
   * @param resultData 결과값
   */
  protected makeResult(resultType: ResultType, resultData?: any) {
    if (resultData) {
      return new ResultDTO(resultType.$status, resultType.$message, resultData);
    } else {
      return new ResultDTO(resultType.$status, resultType.$message);
    }
  }

  /**
   * 전달받은 에러에 해당하는 결과값 타입 확인
   * 리스트에 없을 경우 FAIL로 처리
   * 
   * @param error 에러
   */
  protected checkError(error: Error) {
    for (const resultType of AbstractCommonController.errorTypes) {
      if (resultType.$error === error.constructor) {
        return resultType;
      }
    }
    return ResultTypes.FAIL;
  }

}
