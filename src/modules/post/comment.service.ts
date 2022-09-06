import { ResponseJSON } from 'src/utils/response';
import { postModel } from './schema/post.schema';
import { Injectable, Post, HttpException } from '@nestjs/common';

@Injectable()
export class PostCommentService {
  private readonly postModel = postModel;

  async createPostComment(body) {
    const { postId, replyCommentId, userId, content } = body;
    try {
      const post = await this.postModel.findOne({
        _id: postId,
      });

      if (replyCommentId) {
      } else {
        post.comments.push({
          author: userId,
          content,
        });

        await post.save();
      }
      return new ResponseJSON(null, '成功');
    } catch (err) {
      throw new HttpException(err, 404);
    }

    //   this.postModel.
  }

  async getPostComments(params) {
    const { postId } = params;
    const offset = parseInt(params.offset);
    const limit = offset + parseInt(params.limit);

    try {
      const post = await this.postModel.findOne({ _id: postId });
      await post.populate('comments.author');
      const comments = post.comments;
      comments.sort((a, b) => {
        const l = new Date(a.createTime).getTime();
        const r = new Date(b.createTim).getTime();

        return l < r ? 1 : -1;
      });

      return new ResponseJSON(comments.slice(offset, limit));
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }
}
