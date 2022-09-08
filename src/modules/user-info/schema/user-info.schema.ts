import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

const userObject = {
  _id: ObjectId,
  name: String,
  tag: Array,
  introduce: String,
  phone: {
    type: String,
    unique: true,
    required: false,
  },
  avatar: String,
  email: {
    type: String,
    unique: true,
  },
};

const userSchema = new mongoose.Schema({
  ...userObject,
});

export const userInfoModal = mongoose.model('user_info', userSchema);
export const userInfoKeys = Object.keys(userObject);
