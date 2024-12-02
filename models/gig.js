import mongoose, { Schema } from 'mongoose';

const GigSchema = new Schema({
  topic: String,
  description: String,
  title: String,
  ustar_category: {
    type: String,
    enum: ['RisingStar', 'ShiningStar', 'SuperStar'], 
    required: true, 
  },
  email: String,
  manager_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'open' }
},{ versionKey: false });

export default mongoose.model('Gig', GigSchema);
