const express = require('express');
const app = express()
const db = require('./db')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


app.get("/displayTask", (req, res) => {
  db.all(`SELECT * FROM tasks`, [], (err, rows) => {
    if(err) {
      return res.status(500).json({error:err.message})
    }

    res.json(rows)
  })
})

app.post("/saveTask", (req, res) => {
    const {task} = req.body;
  db.run(
    `INSERT INTO tasks (task) VALUES (?)`,
    [task],

    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Task saved successfully",
        id: this.lastID
      });
    }
  );
});



const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`)
})