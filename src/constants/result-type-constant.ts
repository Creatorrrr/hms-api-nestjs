export class ResultType {

  private status: number;
  private message: string;
  private error: new() => Error;

  constructor(_status: number, _message: string, _error?: new() => Error) {
    this.status = _status;
    this.message = _message;
    this.error = _error;
  }

  public get $status(): number {
    return this.status;
  }

  public get $message(): string {
    return this.message;
  }

  public get $error(): new() => Error {
    return this.error;
  }

}
