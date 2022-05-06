const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Create express app
const app = express()
app.use(express.json())
app.use(cors())

// Database connection
mongoose.connect("mongodb://localhost/tasks")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

// Routers
const ProjectsRouter = require('./routes/projects')
//const TasksRouter = require('./routes/tasks')

app.use('/projects', ProjectsRouter)
//app.use('/tasks', TasksRouter)

// Port
app.listen(8080, () => console.log('Server started'))
