import type { NextFunction, Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body)
      task.project = req.project.id
      req.project.tasks.push(task.id)
      await Promise.allSettled([task.save(), req.project.save()])
      res.send('Task created successfully')
      console.log(task)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static getProjectTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate('project')
      res.json(tasks)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }

  static getProjectTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.task.project.toString() !== req.project.id) {
        const error = new Error('Invalid action')
        res.status(400).json({ error: error.message })
        return
      }
      res.json(req.task)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }

  static updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { tasksId } = req.params
      // const task = await Task.findById(tasksId)
      // if (!task) {
      //   const error = new Error('Task not found')
      //   res.status(404).json({ error: error.message })
      //   return
      // }

      // if (req.task.project.toString() !== req.project.id) {
      //   const error = new Error('Invalid action')
      //   res.status(400).json({ error: error.message })
      //   return
      // }
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.send('Task updated successfully')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }

  static deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { tasksId } = req.params
      // const task = await Task.findById(tasksId)
      // if (!task) {
      //   const error = new Error('Task not found')
      //   res.status(404).json({ error: error.message })
      //   return
      // }
      // if (task.project !== req.project.id) {
      //   const error = new Error('Invalid action')
      //   res.status(400).json({ error: error.message })
      // }
      req.project.tasks = req.project.tasks.filter((task) => task.toString() !== req.task.id.toString())
      await Promise.allSettled([req.task.deleteOne(), req.project.save()])

      res.json('Task delete successfully')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
  static updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { tasksId } = req.params
      const { status } = req.body

      // const task = await Task.findById(tasksId)
      // if (!task) {
      //   const error = new Error('Task not found')
      //   res.status(404).json({ error: error.message })
      //   return
      // }
      req.task.status = status
      await req.task.save()
      res.send('Task updated')

      // // if (task.project !== req.project.id) {
      // //   const error = new Error('Invalid action')
      // //   res.status(400).json({ error: error.message })
      // // }
      // req.project.tasks = req.project.tasks.filter((task) => task.toString() !== tasksId)
      // await Promise.allSettled([task.deleteOne(), req.project.save()])

      // res.json('Task delete successfully')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'There was an error' })
    }
  }
}
