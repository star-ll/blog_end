import mongoose from 'mongoose';

export const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});
export const LoginModel = mongoose.model('users', loginSchema);
