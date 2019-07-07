import { FoodModel } from "@/models/food-model";
import { FoodDTO } from "@/dtos/food-dto";

/**
 * 음식 서비스
 */
export interface FoodService {

  /**
   * 음식 등록
   * 
   * @param food 등록할 음식의 데이터
   */
  registerFood(food: FoodDTO): Promise<{ registered: FoodModel }>;

  /**
   * 음식 수정
   * 
   * @param foodId 수정할 음식의 아이디
   * @param food 수정할 음식의 데이터
   */
  modifyFood(foodId: number, food: FoodDTO): Promise<{ modified: number }>;

  /**
   * 음식 삭제
   * 
   * @param foodId 삭제할 음식의 아이디
   */
  removeFood(foodId: number): Promise<{ removed: number }>;

  /**
   * 음식 단일 조회
   * 
   * @param foodId 조회할 음식의 아이디
   */
  getFoodOne(foodId: number): Promise<{ food: FoodModel }>;

  /**
   * 음식 리스트 조회
   * 
   * @param food 검색 조건
   */
  getFoodList(food: FoodDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ foods: FoodModel[] }>;

}