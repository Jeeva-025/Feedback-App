import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    userEmail: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    file: { 
      type: String, 
      default: null // Optional field, can be null
    },
    image: { 
      type: String, 
      default: null // Optional field, can be null
    },
    votes: { 
      type: Number, 
      default: 0 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
