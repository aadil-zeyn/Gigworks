import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  bio: String,
  profile_picture_url: String,
});

export default mongoose.model('Profile', ProfileSchema);
