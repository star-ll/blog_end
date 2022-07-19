import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  tag: Array,
  introduce: String,
  phone: String,
  avatar: String,
});

export const userInfoModal = mongoose.model('user-info', userSchema);
