import mongoose from 'mongoose';

// const likeItem = new mongoose.Schema({
//   ref: '',
// });

const commentItem = new mongoose.Schema({
  userId: mongoose.SchemaTypes.ObjectId,
});

export const PostSchema = new mongoose.Schema({
  userId: String,

  title: String,

  author: String,

  createTime: Date,

  updateTime: Date,

  content: String,

  // 点赞
  likes: [
    {
      ref: 'user_info',
      type: mongoose.Types.ObjectId,
    },
  ],

  // 评论
  comments: [commentItem],
});

export const postModel = mongoose.model('post', PostSchema);
