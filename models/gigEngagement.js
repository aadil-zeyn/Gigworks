import mongoose from 'mongoose';

const GigEngagementSchema = new mongoose.Schema(
  {
    gig_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['interested', 'in-progress', 'completed', 'cancelled'],
      default: 'interested',
    },
  },
  { versionKey: false }
);

export default mongoose.model('GigEngagement', GigEngagementSchema);
