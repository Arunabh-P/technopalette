import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    public_id: String,
    url: String,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  residence: {
    type: String,
    default: '',
  },
  familyInfo: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'user',
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
