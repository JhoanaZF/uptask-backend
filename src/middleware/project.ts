import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}
export const validateProjectExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
      const error = new Error('Task not found')
      return res.status(404).json({ error: error.message })
    }
    req.project = project
    next()
  } catch (error) {
    return res.status(500).json({ error: 'There was an error' })
  }
}
