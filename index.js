const manager = new TaskManager();
const taskListElement = document.getElementById('taskList');
let currentFilter = 'all';

function showTasks(tasks) {
  taskListElement.innerHTML = '';

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${task.id})">
      <span>${task.title}</span>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskListElement.appendChild(taskDiv);
  });
}

function toggleTaskStatus(id) {
  const task = manager.tasks.find(task => task.id === id);
  if (task) {
    task.toggleComplete();
    manager.saveTasks();
    showTasks(manager.filterTasks(currentFilter));
  }
}

function deleteTask(id) {
  manager.removeTask(id);
  showTasks(manager.filterTasks(currentFilter));
}

function editTask(id) {
  window.location.href = `edit.html?id=${id}`;
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskForm = document.getElementById('taskForm');
  taskForm.classList.add('visible');
  taskForm.classList.remove('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  const taskForm = document.getElementById('taskForm');
  taskForm.classList.add('hidden');
  taskForm.classList.remove('visible');
});

document.getElementById('filterByAll').addEventListener('click', () => {
  currentFilter = 'all';
  showTasks(manager.filterTasks('all'));
});

document.getElementById('filterByCompleted').addEventListener('click', () => {
  currentFilter = 'completed';
  showTasks(manager.filterTasks('completed'));
});

document.getElementById('filterByRemaining').addEventListener('click', () => {
  currentFilter = 'remaining';
  showTasks(manager.filterTasks('remaining'));
});

document.getElementById('sortSelect').addEventListener('change', (e) => {
  const criteria = e.target.value;
  const sortedTasks = manager.sortTasks(criteria);
  showTasks(sortedTasks);
});

document.getElementById('taskFormElement').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  const task = new Task(Date.now(), title, description, new Date().toLocaleString());
  manager.addTask(task);

  document.getElementById('taskForm').classList.add('hidden');
  showTasks(manager.filterTasks(currentFilter));

  document.getElementById('taskFormElement').reset();
});

showTasks(manager.filterTasks(currentFilter));