import express from 'express'
import cors from 'cors'
import pool from './db.js'


const app = express()
const port = 5000


// Middleware //
app.use(cors())
app.use(express.json()) //raw.body


// Routes //

// create a todo

app.post("/todos", async(req, res) => {
    try{
        const {description} = req.body
        const newTodo = await pool.query(`INSERT INTO todo (description) 
        VALUES($1) RETURNING *`, 
        [description])
        res.json(newTodo.rows)
    } catch(err){
        console.error(err.message)
    } 
})

// get all todos

app.get("/todos", async(req, res) => {
    try{
        const allTodos = await pool.query(`SELECT * FROM todo`)
        res.json(allTodos.rows)
    } catch(err){
        console.error(err.message)
    }
})

// get a todo

app.get("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params
        const todo = await pool.query(`SELECT * FROM todo WHERE todoId = $1`, [id])
        res.json(todo.rows)
    } catch(err){
        console.error(err.message)
    }
})

// update a todo

app.put("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query(`UPDATE todo SET description = $1 WHERE todoId = $2`, 
        [description, id])
        res.json("Todo was updated!!!!")
    } catch(err){
        console.err(err.message)
    }
})

// delete a todo

app.delete("/todos/:id", async(req, res) => {
    try{
        const id = req.params.id
        console.log("Received request to delete todo with ID:", id)
        const deleteTodo = await pool.query(`DELETE FROM todo WHERE todoID = $1`, [id])
        res.json("The todo was deleted")
    } catch(err){
        console.error(err.message)
    }
})


// Listening to the dedicated port
app.listen(port, () => {
    console.log(`The app has started on port ${port}`)
})

