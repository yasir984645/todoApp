require('dotenv').config(); // load .env first

const express = require('express');
const app = express();
const pool = require('./db'); // import pool from db.js


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task_list ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ADD NEW TASK
app.post("/addTask", async (req, res) => {
  try {
    const { task } = req.body;
    const result = await pool.query(
      "INSERT INTO task_list (task) VALUES ($1) RETURNING *",
      [task]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK
app.put("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const result = await pool.query(
      "UPDATE task_list SET task = $1 WHERE id = $2 RETURNING *",
      [task, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE TASK
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM task_list WHERE id = $1", [id]);
    res.json({ message: "Task deleted successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
