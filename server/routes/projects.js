const express = require('express')
const router = express.Router({mergeParams: true})
const Project = require('../models/project')
const Task = require('../models/task')

const TasksRouter = require('../routes/tasks');
router.use("/:project_id/tasks", TasksRouter);

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find()
        res.send(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get all tasks in a project
router.get("/:id/tasks", async (req, res) => {
    try {
        const items = await Task.find()
        res.send(items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a project
router.get("/:id", getProject, (req, res) => {
    res.json(res.project)
})

// Create a project
router.post("/", async (req, res) => {
    const project = new Project({
        title: req.body.title,
    })
    try {
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a project
router.patch("/:id", getProject, async (req, res) => {
    if (req.body.title != null) {
        res.project.title = req.body.title
    }
    try {
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    } catch (error) {
        req.status(400).json({ message: error.message })
    }
})

// Delete a project
router.delete("/:id", getProject, async (req, res) => {
    try {
        await res.project.remove()
        res.json({ message: 'Project successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getProject(req, res, next) {
    let project
    try {
        project = await Project.findById(req.params.id)
        if (project == null) {
            return res.status(404).json({ message: 'Cannot find project' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.project = project
    next()
}

module.exports = router
