import { NoticeModel } from '@/models/notice-model';
import { NoticeDTO } from '@/dtos/notice-dto';
import { AbstractCommonService } from '@/services/impl/abstract-common-service';
import { Injectable } from '@nestjs/common';
import { NoticeService } from '../notice-service';
import { Op } from 'sequelize';
import { ResultTypes } from '@/constants/result-types-constant';

/**
 * 공지사항 서비스 구현
 */
@Injectable()
export class NoticeServiceImpl extends AbstractCommonService implements NoticeService {
    
  constructor() {
    super();
    this.logger.debug('NoticeService created');
  }

  public async registerNotice(notice: NoticeDTO) {
    return { registered: await NoticeModel.create(notice) };
  }

  public async modifyNotice(noticeId: number, notice: NoticeDTO) {
    const result = (await NoticeModel.update(notice, { where: { noticeId } }))[0];
    if (result) {
      return { modified: result };
    } else {
      throw new ResultTypes.FAIL_MODIFY.$error();
    }
  }

  public async removeNotice(noticeId: number) {
    const result = await NoticeModel.destroy({ where: { noticeId } });
    if (result) {
      return { removed: result };
    } else {
      throw new ResultTypes.FAIL_REMOVE.$error();
    }
  }

  public async getNoticeOne(noticeId: number) {
    return { notice: await NoticeModel.findByPk(noticeId) };
  }

  public async getNoticeList(notice: NoticeDTO, keyword: string, column: string, limit: number, offset: number) {
    const where = { [Op.and]: notice.toObject() };
    if (column) where[column] = { [Op.like]: `%${keyword || ''}%` };
    return { notices: await NoticeModel.findAll({ where, limit, offset }) };
  }

}
