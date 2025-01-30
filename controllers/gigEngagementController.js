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

export async function withdrawInterest(req, res) {
  const { gig_id } = req.body;
  const user_id = req.headers['user_id'];

  try {
    const gig = await Gig.findById(gig_id);
    console.log(gig_id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingEngagement = await GigEngagement.findOne({ gig_id, user_id });
    if (!existingEngagement) {
      return res.status(400).json({ error: 'No interest expressed in this gig' });
    }

    await GigEngagement.deleteOne({ gig_id, user_id });

    res.json({
      message: 'Interest withdrawn successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// get current user engagement status
export async function getEngagementStatus(req, res) {
  const { gig_id } = req.params;
  const user_id = req.headers['user_id'];

  try {
    const engagement = await GigEngagement.findOne({ gig_id, user_id });
    if (!engagement) {
      return res.json({
        status: null,
      });
    }

    // return the ststus only
    res.json({
      status: engagement.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Update gig engagement status
export async function updateGigEngagementStatus(req, res) {
    const { gig_id, user_id, status } = req.body; // Extract gig_id and status from request body
  
    try {
      const engagement = await GigEngagement.findOneAndUpdate(
        { gig_id, user_id }, 
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
    const engagements = await GigEngagement.find({ gig_id })
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

export const getInterestedGigs = async (req, res) => {
  const user_id = req.headers['user_id'];

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const engagements = await GigEngagement.find({ user_id });

    if (!engagements.length) {
      return res.status(404).json({ message: 'No interested gigs found' });
    }

    // Extract gig IDs and engagement statuses
    const gigIds = engagements.map((engagement) => engagement.gig_id);
    const engagementStatuses = engagements.reduce((acc, engagement) => {
      acc[engagement.gig_id.toString()] = engagement.status;  // Map gig_id to its engagement status
      return acc;
    }, {});

    const gigs = await Gig.find({ _id: { $in: gigIds } }).populate({
      path: 'manager_id',
      select: 'name email profile_picture_url'
    });

    res.status(200).json({
      message: 'Interested gigs fetched successfully',
      gigs: gigs.map((gig) => ({
        _id: gig._id,
        topic: gig.topic,
        description: gig.description,
        title: gig.title,
        ustar_category: gig.ustar_category,
        status: gig.status,
        manager: gig.manager_id,
        gig_engagement_status: engagementStatuses[gig._id.toString()] // Add engagement status
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getGigsWithoutEngagement = async (req, res) => {
  const { user_id, page = 1, limit = 15 } = req.headers;
  console.log(user_id);

  try {
    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.max(1, parseInt(limit, 10));
    
    // Fetch all gig IDs the user is engaged with
    const engagedGigIds = await GigEngagement.find({ user_id: user_id }).distinct('gig_id');
    
    // Fetch gigs that the user is NOT engaged with
    const query = { _id: { $nin: engagedGigIds } };
    
    const totalGigs = await Gig.countDocuments(query);
    
    const gigs = await Gig.find(query)
      .populate('manager_id', 'name email')
      .populate('collaborators', 'name email')
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    console.log(gigs.length);
    res.json({
      page: parsedPage,
      limit: parsedLimit,
      total_gigs: totalGigs,
      gigs: gigs.map((gig) => ({
        _id: gig._id,
        topic: gig.topic,
        description: gig.description,
        title: gig.title,
        ustar_category: gig.ustar_category,
        email: gig.email,
        status: gig.status,
        manager: gig.manager_id,
        collaborators: gig.collaborators,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

