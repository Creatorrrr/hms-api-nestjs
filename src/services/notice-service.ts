import { NoticeDTO } from "@/dtos/notice-dto";
import { NoticeModel } from "@/models/notice-model";

/**
 * 공지사항 서비스
 */
export interface NoticeService {

  /**
   * 공지사항 등록
   * 
   * @param notice 등록할 공지사항의 데이터
   */
  registerNotice(notice: NoticeDTO): Promise<{ registered: NoticeModel }>;

  /**
   * 공지사항 수정
   * 
   * @param noticeId 수정할 공지사항의 아이디
   * @param notice 수정할 공지사항의 데이터
   */
  modifyNotice(noticeId: number, notice: NoticeDTO): Promise<{ modified: number }>;

  /**
   * 공지사항 삭제
   * 
   * @param noticeId 삭제할 공지사항의 아이디
   */
  removeNotice(noticeId: number): Promise<{ removed: number }>;

  /**
   * 공지사항 단일 조회
   * 
   * @param noticeId 조회할 공지사항의 아이디
   */
  getNoticeOne(noticeId: number): Promise<{ notice: NoticeModel }>;

  /**
   * 공지사항 리스트 조회
   * 
   * @param notice 검색 조건
   */
  getNoticeList(notice: NoticeDTO, keyword: string, column: string, limit: number, offset: number): Promise<{ notices: NoticeModel[] }>;

}