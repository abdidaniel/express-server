const express = require('express');

const app = express();

const port = 3000;

//Imita a una base de datos
let tasks = [];

app.use(express.json())

app.post('/tasks', (req, res) =>{
    const task = req.body
    tasks.push(task)
    console.log(tasks)
    res.status(200).send({
        mensaje: 'Tarea agregada exitosamente'
    })
})

app.get('/tasks', (req, res) =>{
    res.status(200).send(tasks)
})

app.get('/tasks/:id', (req, res) =>{
    const id = req.params.id
    const task = tasks.find(task => task.id == id)

    if(task){
        res.status(200).send(task);
    } else {
        res.status(404).send({
            mensaje: "La tarea no existe"
        })
    }
})

app.put('/task', (req, res) =>{
    const task = req.body
    const taskId = task.id

    const taskPos = tasks.findIndex(task => task.id == taskId) 

    if(taskPos != -1){
        tasks[taskPos] = task
        res.status(200).send({
            mensaje: "Tarea actualizada"
        })
    } else {
        res.status(404).send({
            mensaje: "Tarea no encontrada"
        })
    }
})

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(task => task.id != id)
    res.status(200).send({
        mensaje: "Tarea eliminada"
    })
})

app.listen(port, () => {
    console.log("servidor corriendo en el puerto " + port)
})