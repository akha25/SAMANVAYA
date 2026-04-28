const Request = require('../models/Request');
const User = require('../models/User');

exports.createRequest = async (req, res) => {
  try {
    const { title, description, urgency } = req.body;
    
    const newRequest = new Request({
      userId: req.user.id,
      title,
      description,
      urgency
    });
    
    const savedRequest = await newRequest.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let requests;
    
    if (user.role === 'admin' || user.role === 'volunteer') {
      requests = await Request.find().populate('userId', 'name email').sort({ createdAt: -1 });
    } else {
      requests = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });
    }
    
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findById(req.user.id);
    
    const request = await Request.findById(id);
    
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    
    if (user.role === 'volunteer') {
      request.status = 'assigned';
      request.assignedVolunteer = req.user.id;
    } else if (user.role === 'admin') {
      if (status) request.status = status;
    } else {
      return res.status(403).json({ success: false, message: 'Not authorized to update request' });
    }
    
    const updatedRequest = await request.save();
    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
