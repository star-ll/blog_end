import { ResponseJSON } from 'src/utils/response';
import { userInfoModal } from './schema/user-info.schema';
import { Injectable } from '@nestjs/common';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  private readonly userInfoModal = userInfoModal;

  async findAll(count?: number) {
    if (count) {
      const userInfoNum = Math.random() * count;
      return this.userInfoModal
        .find({})
        .limit(-1)
        .skip(userInfoNum)
        .then((res) => {
          return new ResponseJSON(res, '操作成功');
        });
    } else {
      return this.userInfoModal.find({}).then((res) => {
        return new ResponseJSON(res, '操作成功');
      });
    }
  }

  findOne(id: string) {
    return this.userInfoModal.find({ userId: id }).then((res) => {
      return new ResponseJSON(res, '操作成功');
    });
  }

  update(id: string, updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoModal
      .findByIdAndUpdate(id, updateUserInfoDto)
      .then((res) => {
        console.log(res);
      });
  }

  remove(id: string) {
    return `This action removes a #${id} userInfo`;
  }
}
