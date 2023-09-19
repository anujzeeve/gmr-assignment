const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
const validation = require("../core/validation");
router.post('/tasks', auth,  validation.taskCreation,
// only Admin can create task
validation.check, async (req, res) => {

    try {
        if (req.user.userType === "3"){
            const task = new Task({
                ...req.body
            })
            await task.save()
            res.status(201).send(task)
        }

        else{
            res.status(401).send({ error: 'Yo have not access to create Task' })
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    console.log('---------------------25',req.user)
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || 'dueDate';
        const sortOrder = req.query.sortOrder || 'asc';
    
        const filter = {};
        if (req.query.dueDate) {
          filter.dueDate = req.query.dueDate;
        }
        if (req.query.status) {
          filter.status = req.query.status;
        }
    
        const sortOptions = {};
        sortOptions[sortField] = sortOrder;
        if (req.user.userType ==="1"){
            filter.owner = req.user._id
        }
        else if (req.user.userType ==="2"){
            filter.qaUserId = req.user._id
        }

    
        const tasks = await Task.find(filter)
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(limit);
    
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    
    const { description, status,completed } = req.body;
    try {
        if (req.user.userType === "1"){
            console.log(req.user._id)
            const task = await Task.findOneAndUpdate(
                { _id: req.params.id, owner: "req.user._id" },
                {
                  $set: {
                    "description": description,
                    "status": status
                  }
                },
                { new: true } // To return the updated document
              );
              
            await task.save()
            res.status(200).send(task)
        }
        else if (req.user.userType === "2"){
            const task = await Task.findOneAndUpdate(
                { _id: req.params.id, qaUserId: req.user._id },
                {
                  $set: {
                    "description": description,
                    "status": status,
                    "completed":completed
                  }
                },
                { new: true } // To return the updated document
              );
              
            await task.save()
            res.status(200).send(task)
        }
  
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router