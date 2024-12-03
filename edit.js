class Task {
    constructor(id, title, description, createdAt, completed = false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.createdAt = createdAt;
      this.completed = completed;
    }
  
    toggleComplete() {
      this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
      this.tasks = this.loadTasks();
    }

    loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      return tasks ? tasks.map(task => new Task(task.id, task.title, task.description, task.createdAt, task.completed)) : [];
    }

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(task) {
      this.tasks.push(task);
      this.saveTasks();
    }

    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasks();
    }

    updateTask(taskId, updatedTask) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
        this.saveTasks();
      }
    }
}

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