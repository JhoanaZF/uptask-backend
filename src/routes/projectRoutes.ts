import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()
router.post(
  '/',
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('clientName').notEmpty().withMessage('Project client name is required'),
  body('description').notEmpty().withMessage('Project description is required'),
  handleInputErrors,
  ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects),
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

export default router
