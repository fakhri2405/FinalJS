const taskIdParam = new URLSearchParams(window.location.search).get('id');
const taskId = parseInt(taskIdParam, 10);

const manager = new TaskManager();
const task = manager.tasks.find(t => t.id === taskId);

document.getElementById('title').value = task.title;
document.getElementById('description').value = task.description;

document.getElementById('taskFormElement').addEventListener('submit', (e) => {
  e.preventDefault();

  const updatedTitle = document.getElementById('title').value.trim();
  const updatedDescription = document.getElementById('description').value.trim();

  const updatedTask = new Task(task.id, updatedTitle, updatedDescription, task.createdAt, task.completed);
  manager.updateTask(task.id, updatedTask);

  window.location.href = 'index.html';
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});