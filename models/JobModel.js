import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['pending', 'interview', 'declined'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields to the schema
);

export default mongoose.model('Job', jobSchema);
