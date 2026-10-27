const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const goalForm = document.getElementById("goalForm");
const goalList = document.getElementById("goalList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("plannerTasks") || "[]");
let goals = JSON.parse(localStorage.getItem("plannerGoals") || "[]");

function save() {
  localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  localStorage.setItem("plannerGoals", JSON.stringify(goals));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.sort((a,b) => a.time.localeCompare(b.time));
  tasks.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.done ? "completed" : "";
    li.innerHTML = `<span>${item.time} — ${item.text}</span>
      <span>
        <button onclick="toggleTask(${index})">${item.done ? "Undo" : "Done"}</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </span>`;
    taskList.appendChild(li);
  });
  updateProgress();
}

function renderGoals() {
  goalList.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.className = goal.done ? "completed" : "";
    li.innerHTML = `<span>${goal.text}</span>
      <span>
        <button onclick="toggleGoal(${index})">${goal.done ? "Undo" : "Done"}</button>
        <button class="delete" onclick="deleteGoal(${index})">Delete</button>
      </span>`;
    goalList.appendChild(li);
  });
}

function updateProgress() {
  const percent = tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0;
  progress.style.width = percent + "%";
  progressText.textContent = percent + "% completed";
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  tasks.push({text: document.getElementById("task").value, time: document.getElementById("time").value, done:false});
  taskForm.reset(); save(); renderTasks();
});

goalForm.addEventListener("submit", e => {
  e.preventDefault();
  goals.push({text: document.getElementById("goal").value, done:false});
  goalForm.reset(); save(); renderGoals();
});

function toggleTask(i) { tasks[i].done = !tasks[i].done; save(); renderTasks(); }
function deleteTask(i) { tasks.splice(i,1); save(); renderTasks(); }
function toggleGoal(i) { goals[i].done = !goals[i].done; save(); renderGoals(); }
function deleteGoal(i) { goals.splice(i,1); save(); renderGoals(); }

renderTasks();
renderGoals();
