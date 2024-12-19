import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExist } from '../middleware/project'
import { taskBelongsToProject, validateTaskExist } from '../middleware/task'

const router = Router()
// Routes for project
router.post(
  '/',
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('clientName').notEmpty().withMessage('Project client name is required'),
  body('description').notEmpty().withMessage('Project description is required'),
  handleInputErrors,
  ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects)
router.get('/:id', param('id').isMongoId().withMessage('The id is not valid'), handleInputErrors, ProjectController.getProjectById)
router.put(
  '/:id',
  param('id').isMongoId().withMessage('The id is not valid'),
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('clientName').notEmpty().withMessage('Project client name is required'),
  body('description').notEmpty().withMessage('Project description is required'),
  handleInputErrors,
  ProjectController.updateProject
)
router.delete('/:id', param('id').isMongoId().withMessage('The id is not valid'), handleInputErrors, ProjectController.deleteProject)

// Routes for task
router.param('projectId', validateProjectExist)

router.post(
  '/:projectId/tasks',
  body('name').notEmpty().withMessage('Task name is required'),
  body('description').notEmpty().withMessage('Task description is required'),
  TaskController.createTask
)
router.get('/:projectId/tasks', TaskController.getProjectTask)
router.param('tasksId', validateTaskExist)
router.param('tasksId', taskBelongsToProject)
router.get(
  '/:projectId/tasks/:tasksId',
  param('tasksId').isMongoId().withMessage('The id is not valid'),
  handleInputErrors,
  TaskController.getProjectTaskById
)
router.put(
  '/:projectId/tasks/:tasksId',
  body('name').notEmpty().withMessage('Task name is required'),
  body('description').notEmpty().withMessage('Task description is required'),
  param('tasksId').isMongoId().withMessage('The id is not valid'),
  handleInputErrors,
  TaskController.updateTask
)
router.delete(
  '/:projectId/tasks/:tasksId',
  param('tasksId').isMongoId().withMessage('The id is not valid'),
  handleInputErrors,
  TaskController.deleteTask
)
router.post(
  '/:projectId/tasks/:tasksId/status',
  param('tasksId').isMongoId().withMessage('The id is not valid'),
  body('status').notEmpty().withMessage('Task status is required'),
  handleInputErrors,
  TaskController.updateStatus
)
export default router
