import mongoose from 'mongoose';

const GigSchema = new mongoose.Schema({
  topic: String,
  description: String,
  title: String,
  ustar_category: String,
  email: String,
  status: { type: String, default: 'open' }
},{ versionKey: false });

export default mongoose.model('Gig', GigSchema);
