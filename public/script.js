const task = document.getElementById("task");
const btn = document.getElementById("btn");
const listContainer = document.getElementById("listContainer");

const display = async () => {
  listContainer.innerHTML = ""
  try {
    const res = await fetch("/tasks");
    const data = await res.json()

    data.forEach(task => {
      const li = document.createElement('li');

      li.innerHTML = `${task.task}<span><i class='fas fa-close' onclick = "deletetask(${task.id})"></i></span>`;

      listContainer.appendChild(li)
    });
  } catch (err) {

  }
}

display()

const savetask = async () => {
  const taskValue = task.value.trim();

  if (!taskValue) return alert("enter task")
  try {
    const res = await fetch("/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskValue })
    });

    const data = await res.json()
    task.value = ""
    display()
  } catch (err) {
    console.error("Error saving task:", err);
  }

}

const deletetask = async (id) => {
  const res = await fetch(`/deletetask/${id}`, { method: "DELETE" })

  const data = await res.json()

  display();
}



btn.addEventListener("click", savetask)