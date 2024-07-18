import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  user: mongoose.Types.ObjectId;
  reminder?: {
    time?: Date;
    isAcknowledged: boolean;
  }
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reminder: {
    time: { type: Date, required: false },
    isAcknowledged: {
      type: Boolean,
      default: false,
    },
  },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);