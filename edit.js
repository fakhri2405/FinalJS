const taskIdParam = new URLSearchParams(window.location.search).get('id');
const taskId = parseInt(taskIdParam, 10);

const manager = new TaskManager();
const task = manager.tasks.find(t => t.id === taskId);

if (!task) {
  window.location.href = '404.html';
}
else {
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
}

document.getElementById('taskFormElement').addEventListener('submit', (e) => {
  e.preventDefault();

  const updatedTitle = document.getElementById('title').value.trim();
  const updatedDescription = document.getElementById('description').value.trim();

  const titleRegex = /^(?!\d+$)(?!.*\s{2,})(?!^\s)(?!.*\s$)(?=.*\S)(?:(?:[A-Za-zА-Яа-яЁё]{1,16}|[0-9]{1,16})\s?){2,}$/;
  const descriptionRegex = /^.+$/;

  if (!titleRegex.test(updatedTitle)) {
    alert('Invalid title');
    return;
  }

  if (!descriptionRegex.test(updatedDescription)) {
    alert('Invalid description');
    return;
  }

  if (updatedDescription.toLowerCase() === updatedTitle.toLowerCase()) {
    alert('Title and description are the same');
    return;
  }

  const updatedTask = new Task(task.id, updatedTitle, updatedDescription, task.createdAt, task.completed);
  manager.updateTask(task.id, updatedTask);

  window.location.href = 'index.html';
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});