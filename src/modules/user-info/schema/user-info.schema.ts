import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

const userObject = {
  // userId: {
  //   type: ObjectId,
  //   unique: true,
  // },
  _id: ObjectId,
  name: String,
  tag: Array,
  introduce: String,
  phone: String,
  avatar: String,
};

const userSchema = new mongoose.Schema({
  ...userObject,
});

export const userInfoModal = mongoose.model('user_info', userSchema);
export const userInfoKeys = Object.keys(userObject);
