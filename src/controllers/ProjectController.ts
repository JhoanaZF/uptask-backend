import colors from 'colors'
import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    try {
      const project = new Project(req.body)
      // await Project.create(req.body)
      await project.save()
      res.send('create project successfully')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.json(projects)
      // res.send('All Projects')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id)
      console.log(project)

      if (!project) {
        const error = new Error('Project not found')
        res.status(404).json({ error: error.message })
      }
      res.json(project)
      // res.send('All Projects')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static updateProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const project = await Project.findById(id)
      if (!project) {
        const error = new Error('Project not found')
        res.status(404).json({ error: error.message })
      }
      project.clientName = req.body.clientName
      project.projectName = req.body.projectName
      project.description = req.body.description
      await project.save()
      res.send('Project updated')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const project = await Project.findById(id)
      if (!project) {
        const error = new Error('Project not found')
        res.status(404).json({ error: error.message })
      }
      await project.deleteOne()
      res.send('Project delete')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
}
