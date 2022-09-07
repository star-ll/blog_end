import { ResponseJSON } from 'src/utils/response';
import { userInfoModal } from './../user-info/schema/user-info.schema';
import { postModel } from './../post/schema/post.schema';
import { SearchType } from './dto/search.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  private readonly postModel = postModel;
  private readonly userInfoModal = userInfoModal;

  async getSearch({ type = 'all', offset, limit, content }) {
    let res = null;
    if (type === SearchType.ALL) {
      res = await this.postModel.find({ title: content });
    } else if (type === SearchType.USER) {
      res = await this.userInfoModal.find({ name: content });
    }

    return new ResponseJSON(res, '成功');
  }
}
