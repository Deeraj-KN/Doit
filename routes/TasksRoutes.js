import express from 'express';
const router = express.Router();

import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  showStats,
} from '../controllers/TasksController.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createTask).get(getAllTasks);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteTask).patch(testUser, updateTask);

export default router;
