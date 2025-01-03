import GigEngagement from '../models/gigEngagement.js';
import Gig from '../models/gig.js';
import User from '../models/user.js';

export async function expressInterestInGig(req, res) {
  const { gig_id } = req.body; // Gig ID from request body
  const user_id = req.headers['user_id']; // User ID from request headers

  try {
    // Validate if gig and user exist
    const gig = await Gig.findById(gig_id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has already expressed interest in the gig
    const existingEngagement = await GigEngagement.findOne({ gig_id, user_id });
    if (existingEngagement) {
      return res.status(400).json({ error: 'Already expressed interest in this gig' });
    }

    // Create a new engagement entry
    const newEngagement = new GigEngagement({ gig_id, user_id, status: 'interested' });
    await newEngagement.save();

    res.status(201).json({
      message: 'Interest expressed successfully',
      engagement_id: newEngagement.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Update gig engagement status
export async function updateGigEngagementStatus(req, res) {
    const { gig_id, status } = req.body; // Extract gig_id and status from request body
  
    try {
      const engagement = await GigEngagement.findOneAndUpdate(
        { gig_id }, 
        { status }, 
        { new: true } 
      );
  
      if (!engagement) {
        return res.status(404).json({ error: 'Gig engagement not found' });
      }
  
      res.json({ 
        message: 'Gig status updated successfully', 
        engagement 
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid request' });
    }
  }
  

export async function getInterestedUsers(req, res) {
  const { gig_id } = req.params;
console.dir(gig_id)
  try {
    const engagements = await GigEngagement.find({ gig_id, status: 'interested' })
      .populate('user_id', 'name email') // Populate user details
      .exec();

    if (!engagements.length) {
      return res.status(404).json({ message: 'No users found who showed interest in this gig.' });
    }

    const interestedUsers = engagements.map((engagement) => ({
      user_id: engagement.user_id._id,
      name: engagement.user_id.name,
      email: engagement.user_id.email,
      status: engagement.status,
    }));

    res.json({
      message: 'List of users who showed interest in the gig',
      gig_id,
      interestedUsers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching interested users.' });
  }
}
