import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'On Hold'],
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.startDate ? value > this.startDate : true;
      },
      message: 'End date must be after start date'
    }
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
