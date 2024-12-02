import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['manager', 'user', 'admin'], default: 'user' }, // Define user roles
    profile_picture_url: { type: String }, // Optional field for user profile picture
  },
  { versionKey: false, timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model('User', UserSchema);
