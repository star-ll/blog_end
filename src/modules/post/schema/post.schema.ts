import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  userId: String,

  title: String,

  author: String,

  createTime: Date,

  updateTime: Date,

  content: String,
});

export const postModel = mongoose.model('post', PostSchema);
