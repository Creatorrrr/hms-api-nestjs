import { ResultType } from '@/constants/result-type-constant';
import { ModifyFailedError } from '@/errors/modify-failed-error';
import { RemoveFailedError } from '@/errors/remove-failed-error';
import { RegisterFailedError } from '@/errors/register-failed-error';
import { GetFailedError } from '@/errors/get-failed-error';
import { HttpStatus } from '@nestjs/common';

export class ResultTypes {

  public static readonly SUCCESS =            new ResultType(HttpStatus.OK, '성공');
  public static readonly SUCCESS_GET =        new ResultType(HttpStatus.OK, '조회 성공');
  public static readonly SUCCESS_GET_EMPTY =  new ResultType(HttpStatus.NO_CONTENT, '조회 성공 (컨텐츠 없음)');
  public static readonly SUCCESS_REGISTER =   new ResultType(HttpStatus.CREATED, '등록 성공');
  public static readonly SUCCESS_MODIFY =     new ResultType(HttpStatus.OK, '수정 성공');
  public static readonly SUCCESS_REMOVE =     new ResultType(HttpStatus.OK, '삭제 성공');
  public static readonly FAIL =               new ResultType(HttpStatus.INTERNAL_SERVER_ERROR, '실패');
  public static readonly FAIL_GET =           new ResultType(HttpStatus.INTERNAL_SERVER_ERROR, '조회 실패', GetFailedError);
  public static readonly FAIL_REGISTER =      new ResultType(HttpStatus.INTERNAL_SERVER_ERROR, '등록 실패', RegisterFailedError);
  public static readonly FAIL_MODIFY =        new ResultType(HttpStatus.INTERNAL_SERVER_ERROR, '수정 실패', ModifyFailedError);
  public static readonly FAIL_REMOVE =        new ResultType(HttpStatus.INTERNAL_SERVER_ERROR, '삭제 실패', RemoveFailedError);

}
