import { HealthDiaryModel } from "@/models/health-diary-model";
import { HealthDiaryDTO } from "@/dtos/health-diary-dto";

/**
 * 운동일기 서비스
 */
export interface HealthDiaryService {

  /**
   * 운동일기 등록
   * 
   * @param healthDiary 등록할 운동일기의 데이터
   */
  registerHealthDiary(healthDiary: HealthDiaryDTO): Promise<{ registered: HealthDiaryModel }>;

  /**
   * 운동일기 수정
   * 
   * @param healthDiaryId 수정할 운동일기의 아이디
   * @param healthDiary 수정할 운동일기의 데이터
   */
  modifyHealthDiary(healthDiaryId: number, healthDiary: HealthDiaryDTO): Promise<{ modified: number }>;

  /**
   * 운동일기 삭제
   * 
   * @param healthDiaryId 삭제할 운동일기의 아이디
   */
  removeHealthDiary(healthDiaryId: number): Promise<{ removed: number }>;

  /**
   * 운동일기 단일 조회
   * 
   * @param healthDiaryId 조회할 운동일기의 아이디
   */
  getHealthDiaryOne(healthDiaryId: number): Promise<{ healthDiary: HealthDiaryModel }>;

  /**
   * 운동일기 리스트 조회
   * 
   * @param healthDiary 검색 조건
   */
  getHealthDiaryList(healthDiary: HealthDiaryDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ healthDiaries: HealthDiaryModel[] }>;

}