const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Task = require('../models/task');
const auth = require('../middlewares/auth');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'API for managing tasks',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/tasks.js'], // Specify the path to this file
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Task ID
 *         description:
 *           type: string
 *           description: Task description
 *         status:
 *           type: string
 *           description: Task status
 *         completed:
 *           type: boolean
 *           description: Task completion status
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date of the task
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tasks per page (default is 10)
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: Field to sort tasks by (default is 'dueDate')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort order ('asc' or 'desc', default is 'asc')
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks by due date
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status
 *     responses:
 *       '200':
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/tasks', auth, async (req, res) => {
  // Your route logic here
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       '200':
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 */
router.get('/tasks/:id', auth, async (req, res) => {
  // Your route logic here
});

// Define the rest of your routes similarly

module.exports = router;

module.exports = {
  router,
  swaggerSpec,
};
