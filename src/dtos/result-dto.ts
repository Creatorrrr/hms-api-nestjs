/**
 * 결과값 DTO
 */
export class ResultDTO {

  public readonly statusCode: number;
  public readonly message: string;
  public readonly result: any;

  constructor(_statusCode: number, _message: string, _result?: any) {
    this.statusCode = _statusCode;
    this.message = _message;
    this.result = _result;
  }

}
