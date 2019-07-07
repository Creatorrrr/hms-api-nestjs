import { DietModel } from "@/models/diet-model";
import { DietDTO } from "@/dtos/diet-dto";

/**
 * 식단 서비스
 */
export interface DietService {

  /**
   * 식단 등록
   * 
   * @param diet 등록할 식단의 데이터
   */
  registerDiet(diet: DietDTO): Promise<{ registered: DietModel }>;

  /**
   * 식단 수정
   * 
   * @param dietId 수정할 식단의 아이디
   * @param diet 수정할 식단의 데이터
   */
  modifyDiet(dietId: number, diet: DietDTO): Promise<{ modified: number }>;

  /**
   * 식단 삭제
   * 
   * @param dietId 삭제할 식단의 아이디
   */
  removeDiet(dietId: number): Promise<{ removed: number }>;

  /**
   * 식단 단일 조회
   * 
   * @param dietId 조회할 식단의 아이디
   */
  getDietOne(dietId: number): Promise<{ diet: DietModel }>;

  /**
   * 식단 리스트 조회
   * 
   * @param diet 검색 조건
   */
  getDietList(diet: DietDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ diets: DietModel[] }>;

}