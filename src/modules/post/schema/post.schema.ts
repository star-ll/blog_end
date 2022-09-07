import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      ref: 'user_info',
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  },
);

export const PostSchema = new mongoose.Schema(
  {
    userId: String,

    title: String,

    author: String,

    content: String,

    tag: [String],

    views: {
      type: Number,
      default: 0,
    }, // 浏览量
    // 点赞
    likes: [
      {
        ref: 'user_info',
        type: mongoose.Types.ObjectId,
      },
    ],

    // 评论
    comments: [CommentSchema],
  },
  {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  },
);

export const postModel = mongoose.model('post', PostSchema);
