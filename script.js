// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");
  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveAndRender();
});

// Toggle task complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveAndRender();
  }
}

// Delete task
function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveAndRender();
  }
}

// Save to local storage & render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render task list
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="window.toggleComplete(${index})">${task.text}</span>
      <div class="task-buttons">
        <button onclick="window.editTask(${index})">✏️</button>
        <button onclick="window.deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

// Update progress bar
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  progress.style.width = percent + "%";
  progressText.textContent = `${percent}% Completed`;
}

// Make functions global for inline onclick
window.toggleComplete = toggleComplete;
window.editTask = editTask;
window.deleteTask = deleteTask;
