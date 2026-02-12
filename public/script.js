const task = document.getElementById("task");
const btn = document.getElementById("btn");
const listContainer = document.getElementById("listContainer");

const loadTask = async () => {
  const res = await fetch("/displayTask");
  const data = await res.json();

  listContainer.innerHTML = ""
  data.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML =`${task.task}<span></span>`

    listContainer.appendChild(li)
  });
  
}

loadTask()

const saveTask = async () => {
  const taskValue = task.value;
  const res = await fetch("/saveTask",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({task:taskValue})
    });
    
    res.json(alert(""))
    loadTask()
}

btn.addEventListener("click", saveTask)