import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}
export const validateTaskExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tasksId } = req.params
    const task = await Task.findById(tasksId)
    if (!task) {
      const error = new Error('Task not found')
      return res.status(404).json({ error: error.message })
    }
    req.task = task
    next()
  } catch (error) {
    return res.status(500).json({ error: 'There was an error' })
  }
}

export const taskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error('Invalid action')
    return res.status(404).json({ error: error.message })
  }
  next()
  // } catch (error) {
  //   return res.status(500).json({ error: 'There was an error' })
  // }
}
