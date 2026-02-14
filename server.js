require('dotenv').config(); // load .env first

const express = require('express');
const app = express();
const pool = require('./db'); // import pool from db.js
const cors = require('cors');

// ===== MIDDLEWARE =====
app.use(cors()); // allow cross-origin requests if you ever connect a frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve frontend

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection failed:', err.message);
  else console.log('DB connected, time:', res.rows[0]);
});

// ===== ROUTES =====

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task_list ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ADD NEW TASK
app.post("/addTask", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const result = await pool.query(
      "INSERT INTO task_list (task) VALUES ($1) RETURNING *",
      [task]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding task:", err.message);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// UPDATE TASK
app.put("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const result = await pool.query(
      "UPDATE task_list SET task = $1 WHERE id = $2 RETURNING *",
      [task, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE TASK
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM task_list WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully", id });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// ===== SERVER =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
