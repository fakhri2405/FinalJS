const taskIdParam = new URLSearchParams(window.location.search).get('id');
const taskId = parseInt(taskIdParam, 10);

const manager = new TaskManager();
const task = manager.tasks.find(t => t.id === taskId);

document.getElementById('taskTitle').textContent = task.title;
document.getElementById('taskDescription').textContent = task.description;
document.getElementById('taskCreatedAt').textContent = task.createdAt;
document.getElementById('taskStatus').textContent = task.completed ? 'Completed' : 'Remaining';

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});