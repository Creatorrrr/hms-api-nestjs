import { GymModel } from "@/models/gym-model";
import { GymDTO } from "@/dtos/gym-dto";

/**
 * 헬스장 서비스
 */
export interface GymService {

  /**
   * 헬스장 등록
   * 
   * @param gym 등록할 헬스장의 데이터
   */
  registerGym(gym: GymDTO): Promise<{ registered: GymModel }>;

  /**
   * 헬스장 수정
   * 
   * @param gymId 수정할 헬스장의 아이디
   * @param gym 수정할 헬스장의 데이터
   */
  modifyGym(gymId: number, gym: GymDTO): Promise<{ modified: number }>;

  /**
   * 헬스장 삭제
   * 
   * @param gymId 삭제할 헬스장의 아이디
   */
  removeGym(gymId: number): Promise<{ removed: number }>;

  /**
   * 헬스장 단일 조회
   * 
   * @param gymId 조회할 헬스장의 아이디
   */
  getGymOne(gymId: number): Promise<{ gym: GymModel }>;

  /**
   * 헬스장 단일 조회 (하위 포함)
   * 
   * @param gymId 조회할 헬스장의 아이디
   */
  getGymOneWithOwner(gymId: number): Promise<{ gym: GymModel }>;

  /**
   * 헬스장 리스트 조회
   * 
   * @param gym 검색 조건
   */
  getGymList(gym: GymDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ gyms: GymModel[] }>;

}