import { ResponseJSON } from 'src/utils/response';
import { userInfoModal } from './schema/user-info.schema';
import { Injectable } from '@nestjs/common';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  private readonly userInfoModal = userInfoModal;

  async findAll({ count, userId }: { count?: number; userId?: string }) {
    if (count) {
      let random = 0;
      return this.userInfoModal
        .find({})
        .estimatedDocumentCount()
        .then((size) => {
          const max = size - count;
          const min = 0;
          random = Math.floor(Math.random() * (max - min + 1));

          return this.userInfoModal.find({}).skip(random).limit(count);
        })
        .then((res) => {
          return new ResponseJSON(res, '操作成功');
        });
    } else if (userId) {
      return this.userInfoModal
        .findOne({ _id: userId }, { __v: 0 })
        .then((res) => {
          return new ResponseJSON(res, '操作成功');
        });
    } else {
      return ResponseJSON(null, '参数错误:必须传token或者count参数', 400);
    }
  }

  findOne(id: string) {
    return this.userInfoModal.find({ _id: id }).then((res) => {
      return new ResponseJSON(res, '操作成功');
    });
  }

  update(userId: string, updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoModal
      .updateOne(
        {},
        { _id: userId, ...updateUserInfoDto },
        {
          upsert: true,
        },
      )
      .then((res) => {
        return new ResponseJSON(true, '操作成功');
      });
  }

  remove(id: string) {
    return this.userInfoModal
      .remove({
        _id: id,
      })
      .then((res) => {
        return new ResponseJSON(res, '操作成功');
      });
  }
}
