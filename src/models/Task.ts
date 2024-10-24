import mongoose, { Schema, Document, Types } from 'mongoose'
import Project from './Project'

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
}

export const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    project: { Types: Types.ObjectId, ref: 'Project' }
  },
  { timestamps: true }
)

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
