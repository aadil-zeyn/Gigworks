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

    if (user.role === "manager") {
      filter.manager_id = user_id;
    }

    const gigs = await Gig.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('manager_id', 'name email profile_picture_url role') // Populates manager details
      .populate('collaborators', 'name email profile_picture_url role'); 

    const total_gigs = await Gig.countDocuments(filter);

    res.json({
      page,
      limit,
      total_gigs,
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
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}

//Fetch gig by ID
export async function getGigById(req, res) {
  const { gig_id } = req.params;

  try {
    const gig = await Gig.findById(gig_id).populate(
      'manager_id',
      'name email profile_picture_url role'
    );

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.json({
      _id: gig._id,
      topic: gig.topic,
      description: gig.description,
      title: gig.title,
      ustar_category: gig.ustar_category,
      email: gig.email,
      status: gig.status,
      manager: gig.manager_id, 
    });
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

// Update gig details
export async function updateGigDetails(req, res) {
  const { gig_id } = req.params;
  const { topic, description, title, ustar_category } = req.body;

  const updatedFields = {};

  if (topic) updatedFields.topic = topic;
  if (description) updatedFields.description = description;
  if (title) updatedFields.title = title;
  if (ustar_category) updatedFields.ustar_category = ustar_category;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided for update' });
  }

  try {
    const updatedGig = await Gig.findByIdAndUpdate(
      gig_id,
      { $set: updatedFields },
      { new: true, runValidators: true } 
    );

    if (!updatedGig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.json({
      message: 'Gig details updated successfully',
      updatedGig,
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}


export async function addCollaborator(req, res) {
  const { gig_id } = req.params;
  const { collaborator_id } = req.body;

  try {
    const collaborator = await User.findById(collaborator_id);
    if (!collaborator || collaborator.role !== 'manager') {
      return res.status(400).json({ error: 'Invalid collaborator. Must be a manager.' });
    }

    const gig = await Gig.findByIdAndUpdate(
      gig_id,
      { $addToSet: { collaborators: collaborator_id } }, 
      { new: true }
    ).populate('collaborators', 'name email'); 

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.status(200).json({
      message: 'Collaborator added successfully',
      gig,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the collaborator.' });
  }
}

export async function removeCollaborator(req, res) {
  const { gig_id, collaborator_id } = req.params;

  try {
    const gig = await Gig.findByIdAndUpdate(
      gig_id,
      { $pull: { collaborators: collaborator_id } },
      { new: true }
    ).populate('collaborators', 'name email');

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.status(200).json({
      message: 'Collaborator removed successfully',
      gig,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while removing the collaborator.' });
  }
}
