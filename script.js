function createTaskElement(text, time, isCompleted) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  const contentDiv = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = text;

  const timeSpan = document.createElement("div");
  timeSpan.className = "task-time";
  timeSpan.textContent = time;

  contentDiv.appendChild(strong);
  contentDiv.appendChild(timeSpan);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(li, strong);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteTask(li);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.onclick = () => markComplete(li);

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  if (!isCompleted) {
    actionsDiv.appendChild(completeBtn);
  }

  li.appendChild(contentDiv);
  li.appendChild(actionsDiv);

  return li;
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const time = new Date().toLocaleString();
  const task = createTaskElement(taskText, time, false);
  document.getElementById("pendingList").appendChild(task);

  taskInput.value = "";
  updatePlaceholders(); 
}

function deleteTask(task) {
  task.remove();
  updatePlaceholders(); 
}

function markComplete(task) {
  const text = task.querySelector("strong").textContent;
  const time = new Date().toLocaleString();
  const newTask = createTaskElement(text, time, true);
  document.getElementById("completedList").appendChild(newTask);
  task.remove();
  updatePlaceholders(); 
}

function editTask(taskElement, textElement) {
  const newText = prompt("Edit your task:", textElement.textContent);
  if (newText !== null && newText.trim() !== "") {
    textElement.textContent = newText.trim();
  }
}

function updatePlaceholders() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  document.getElementById("pendingPlaceholder").style.display =
    pendingList.children.length === 0 ? "block" : "none";

  document.getElementById("completedPlaceholder").style.display =
    completedList.children.length === 0 ? "block" : "none";
}
