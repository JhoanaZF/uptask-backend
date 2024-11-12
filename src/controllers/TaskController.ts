import colors from 'colors'
import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
      const error = new Error('Task not found')
      res.status(404).json({ error: error.message })
    }
    try {
      const task = new Task(req.body)
      task.project = project.id
      await task.save()
      res.send('Task created successfully')
      console.log(task)
    } catch (error) {
      console.log(colors.red.bold(error))
    }
  }
}
