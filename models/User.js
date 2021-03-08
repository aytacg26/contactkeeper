import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 80,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 80,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100, //Hash password will be longer than 30 chars
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('users', UserSchema);

export default User;
