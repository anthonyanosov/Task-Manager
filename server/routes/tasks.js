const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a specific task
router.get("/:id", getTask, (req, res) => {
    res.json(res.task)
})

// Create a task
router.post("/", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        projectID: req.body.projectID
    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a task
router.patch("/:id", getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title
    }
    if (req.body.description != null) {
        res.task.description = req.body.description
    }
    if (req.body.completed != null) {
        res.task.completed = req.body.completed
    }
    if (req.body.projectID != null) {
        res.task.projectID = req.body.projectID
    }
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (error) {
        req.status(400).json({ message: error.message })
    }
})

// Delete a task
router.delete("/:id", getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Task successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getTask(req, res, next) {
    let task
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.task = task
    next()
}

module.exports = router
