import { PipeTransform, ArgumentMetadata, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

/**
 * 쿼리를 파싱하고 파라미터의 클래스 타입에 맞도록 프로퍼티를 필터링한 객체를 생성
 */
export class ParseFilterPipe extends ValidationPipe implements PipeTransform<string> {

  constructor(options?: ValidationPipeOptions) {
    super(options || { whitelist: true, skipMissingProperties: true, transform: true });
  }
    
  transform(value: string, metadata: ArgumentMetadata) {
    return super.transform(value ? JSON.parse(value) : {}, metadata);
  }

}