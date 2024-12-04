import Gig from '../models/gig.js';
import gigEngagement from '../models/gigEngagement.js';
import User from '../models/user.js';

// Get all gigs with optional filters
export async function getGigs(req, res) {
  const { page = 1, limit = 10, topic, ustar_category } = req.query;
  const user_id = req.headers['user_id']; 
  const filter = {};
  
  if (topic) filter.topic = topic;
  if (ustar_category) filter.ustar_category = ustar_category;

  try {
    // Validate user role
    const user = await User.findById(user_id);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    if (user.role=="manager"){
      filter.manager_id=user_id
    }
    const gigs = await Gig.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total_gigs = await Gig.countDocuments(filter);
    
    res.json({ page, limit, total_gigs, gigs });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}

// Create a new gig
export async function createGig(req, res) {
  const manager_id = req.headers['user_id']; 
  const { topic, description, title, ustar_category, email } = req.body;


  try {
    const newGig = new Gig({ topic, description, title, ustar_category, email, manager_id });
    await newGig.save();
    res.status(201).json({ message: 'Gig created successfully', gig_id: newGig._id });
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
}

// Update gig status 
// split this api into 2 for gig status change and git engagement status change by admin , user and manager
export async function updateGigStatus(req, res) {
  const { gig_id, status } = req.body;
  // Authenticate
  try {
    const gig = await Gig.findByIdAndUpdate(gig_id, { status }, { new: true });
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    if (status=="paused" || status=="revoked"){

      await gigEngagement.updateMany(
        { gig_id }, 
        { status } 
      );
    }

    res.json({ message: 'Gig status updated successfully', gig_id, new_status: gig.status });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}
