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
      <span onclick="viewTaskDetails(${task.id})" style="cursor: pointer;">${task.title}</span>
      <button onclick="viewTaskDetails(${task.id})">Details</button>
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
  else {
    alert(`Task with id ${id} not found`);
  }
}

function deleteTask(id) {
  manager.removeTask(id);
  showTasks(manager.filterTasks(currentFilter));
}

function editTask(id) {
  window.location.href = `edit.html?id=${id}`;
}

function viewTaskDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskForm = document.getElementById('taskForm');
  taskForm.classList.add('visible');
  taskForm.classList.remove('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  const taskForm = document.getElementById('taskForm');
  taskForm.classList.remove('visible');
  taskForm.classList.add('hidden');
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

  const titleRegex = /^(?!\d+$)(?!.*\s{2,})(?!^\s)(?!.*\s$)(?=.*\S)(?:(?:[A-Za-zА-Яа-яЁё]{1,16}|[0-9]{1,16})\s?){2,}$/;
  const descriptionRegex = /^.+$/;

  if (!titleRegex.test(title)) {
    alert('Invalid title');
    return;
  }

  if (!descriptionRegex.test(description)) {
    alert('Invalid description');
    return;
  }

  if (description.toLowerCase() === title.toLowerCase()) {
    alert('Title and description are the same');
    return;
  }

  const task = new Task(Date.now(), title, description, new Date().toLocaleString());
  manager.addTask(task);

  const taskForm = document.getElementById('taskForm');
  taskForm.classList.remove('visible');
  taskForm.classList.add('hidden');

  showTasks(manager.filterTasks(currentFilter));

  document.getElementById('taskFormElement').reset();
});

showTasks(manager.filterTasks(currentFilter));