import Feedback from "../models/Feedback.js";

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getUserFeedbacks = async (req, res, next) => {
  try {
    const { userEmail } = req.query; 
    
    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });  
    }
    const feedbacks = await Feedback.find({ userEmail});  
    if (feedbacks.length === 0) {
      return res.status(404).json({ error: "No feedbacks found for this email" }); 
    }
   res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const addFeedback = async (req, res) => {
  try {
    const { content, file, image, userEmail } = req.body;  
    const feedback = new Feedback({
      userEmail,  
      content,
      file,
      image,
    });
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    console.log(id);
    console.log(content);

    const feedback = await Feedback.findByIdAndUpdate(id, { content }, { new: true });
    console.log(feedback);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const upvoteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(id, { $inc: { votes: 1 } }, { new: true });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
