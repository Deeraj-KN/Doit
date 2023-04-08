import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    Priority: {
      type: String,
      required: [true, 'Please provide Priority'],
      maxlength: 50,
    },
    Description: {
      type: String,
      required: [true, 'Please provide Description'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Inprogress', 'Done', 'Pending'],
      default: 'Pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Task', JobSchema)
