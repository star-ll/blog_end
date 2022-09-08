import { userInfoModal } from './../user-info/schema/user-info.schema';
import { FindAllPostDto } from './dto/post.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseJSON } from 'src/utils';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postModel } from './schema/post.schema';

@Injectable()
export class PostService {
  private postModel = postModel;

  create(userId, createPostDto: CreatePostDto) {
    return this.postModel
      .create({
        author: userId,
        ...createPostDto,
      })
      .then(() => {
        return new ResponseJSON(true);
      });
  }

  findAll(params?: FindAllPostDto) {
    const { offset, limit } = params;
    const queryParams = params ? { ...params, offset: null, limit: null } : {};

    const posts = this.postModel.find(queryParams, { __v: 0, comments: 0 });
    return posts
      .sort({ createTime: -1 })
      .skip(offset)
      .limit(limit)
      .then((res) => {
        return new ResponseJSON(res);
      });
  }

  async findOne(id: string) {
    try {
      const post = await this.postModel.findOne({ _id: id });
      await post.populate(['likes', 'author']);
      return new ResponseJSON(post);
    } catch (err) {
      throw new HttpException('未找到该文章', HttpStatus.NOT_FOUND);
    }
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

  // 为某篇文章点赞
  async likePost(userId, params) {
    const { postId } = params;

    const post = await this.postModel.findOne({
      _id: postId,
    });
    const userInfo = await userInfoModal.findOne({
      _id: userId,
    });

    const index = post.likes.indexOf(userInfo._id);
    const isExistLike = index > -1;

    try {
      if (isExistLike) {
        post.likes.splice(index);
      } else {
        post.likes.push(userInfo);
      }

      await post.save();
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    return new ResponseJSON(
      { likeLength: post.likes.length },
      isExistLike ? '取消点赞' : '点赞成功',
    );
  }

  async addViews(params) {
    const { postId } = params;
    this.postModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      },
    );

    return true;
  }
}
