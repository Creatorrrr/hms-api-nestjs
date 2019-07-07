/**
 * 공통 유틸
 */
export class CommonUtil {

  public static toObject(original: any) {
    return JSON.parse(JSON.stringify(original));
  }

  /**
   * 객체 타입 변환
   * 
   * @param original 원본 객체
   * @param type 변환할 클래스 타입
   */
  public static convertType<T>(original: any, type: new() => T) {
    const result = Object.assign(new type(), original) as T;  // 전달받은 클래스 타입으로 변환
    return CommonUtil.removeFieldsIfNotExist(result, type);
  }

  /**
   * 타입을 확인하고 타입에 해당하지 않는 프로퍼티 제거
   * 
   * @param original 원본 객체
   * @param type 확인할 클래스 타입
   */
  public static removeFieldsIfNotExist<T>(original: any, type: new() => T): T {
    // T 클래스에 있는 프로퍼티만 복사
    const typeProperties = Object.getOwnPropertyNames(type.prototype);  // 해당 클래스의 프로퍼티 리스트
    const parentTypeProperties = Object.getOwnPropertyNames(Object.getPrototypeOf(type.prototype)); // 부모 클래스의 프로퍼티 리스트
    const classProperties = typeProperties.concat(parentTypeProperties);
    console.log(type);
    const originalProperties = Object.keys(original);
    for (const key of originalProperties) {
      if (!(classProperties.includes(key) || classProperties.includes('$' + key))) {
        delete original[key];
      }
    }
    return original;
  }

  /**
   * 전달받은 타입의 객체를 생성하고
   * 생성된 객체에 원본 객체의 프로퍼티와 동일한 이름의 setget이 존재할 경우
   * 해당 프로퍼티의 값을 (얕은)복사한다.
   * (setget의 접두사'$'는 자동으로 생략)
   * 
   * @param parsed 객체화된 쿼리 스트링
   * @param type 생성할 클래스 타입
   */
  public static copyPropertiesIfExist<T>(parsed: any, type: new() => T) {
    const created = new type();

    // T 클래스에 있는 프로퍼티만 복사
    const tProperties = Object.getOwnPropertyNames(type.prototype);
    for (const tProperty of tProperties) {
      const parsedProperty = tProperty.startsWith('$') ? tProperty.substring(1) : tProperty;
      if (parsed.hasOwnProperty(parsedProperty)) {
        if (parsed[parsedProperty] !== undefined) {
          (created as any)[tProperty] = parsed[parsedProperty];
        }
      }
    }
    return created;
  }
    
}
