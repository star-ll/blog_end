import { FindAllPostDto } from './dto/post.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseJSON } from 'src/utils';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postModel } from './schema/post.schema';

@Injectable()
export class PostService {
  private postModel = postModel;

  create(createPostDto: CreatePostDto) {
    return this.postModel
      .create({
        ...createPostDto,
        updateTime: new Date(),
        createTime: new Date(),
      })
      .then(() => {
        return new ResponseJSON(true);
      });
  }

  findAll(params?: FindAllPostDto) {
    return this.postModel.find(params || {}, { __v: 0 }).then((res) => {
      return new ResponseJSON(res);
    });
  }

  async findOne(id: string) {
    return this.postModel
      .find({ _id: id })
      .then((res) => {
        return new ResponseJSON(res);
      })
      .catch(() => {
        throw new HttpException('未找到该文章', HttpStatus.NOT_FOUND);
      });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel
      .updateOne({ _id: id }, { ...updatePostDto, updateTime: new Date() })
      .then(() => {
        return this.postModel.findOne({ _id: id });
      })
      .then((res) => {
        return new ResponseJSON(res, '更新成功');
      })
      .catch(() => {
        throw new HttpException('更新失败', HttpStatus.FORBIDDEN);
      });
  }

  remove(id: string) {
    return this.postModel
      .deleteOne({ _id: id })
      .then(() => {
        return new ResponseJSON(true, '删除文章成功');
      })
      .catch(() => {
        throw new HttpException('未找到该文章', HttpStatus.NOT_FOUND);
      });
  }
}
