// @ts-nocheck
const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors({
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());

let todos = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a To-Do App", completed: false }
];

// GET all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// POST new todo
app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT update todo
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (title !== undefined) {
        if (typeof title !== 'string') {
            return res.status(400).json({ error: "Title must be a string" });
        }
        todo.title = title;
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be true or false' });
        }
        todo.completed = completed;
    }

    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = todos.splice(index, 1); // remove todo
    res.json({ message: "Todo deleted successfully", todo: deletedTodo[0] });
});

app.delete("/todos", (req, res) => {
    todos = [];
    res.json({ message: "All todos deleted successfully" });
});

app.get('/', (req, res) => {
    res.send('Hello, this is the backend of our To-Do app!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});