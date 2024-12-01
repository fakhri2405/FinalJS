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
      return tasks ? tasks : [];
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

    filterTasks(status) {
        if (status === 'completed') {
          return this.tasks.filter(task => task.completed);
        }
        else if (status === 'remaining') {
          return this.tasks.filter(task => !task.completed);
        }
        else {
          return this.tasks;
        }
    }

    sortTasks(criteria) {
        if (criteria === 'date') {
          return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        else if (criteria === 'name') {
          return this.tasks.sort((a, b) => a.title.localeCompare(b.title));
        }
    }
}

const manager = new TaskManager();
const taskListElement = document.getElementById('taskList');

function showTasks(tasks) {
    taskListElement.innerHTML = '';

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${task.id})">
        <span>${task.title}</span>
        <button onclick="editTask(${task.id})>Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskListElement.appendChild(taskDiv);
    });
}

function toggleTaskStatus(id) {
    const task = manager.tasks.find(task => task.id === id);
    task.toggleComplete();
    manager.saveTasks();
    showTasks(manager.filterTasks('all'));
}

function deleteTask(id) {
    manager.removeTask(id);
    showTasks(manager.filterTasks('all'));
}

function editTask(id) {

}

document.getElementById('addTaskBtn').addEventListener('click', () => {
    document.getElementById('taskForm').classList.remove('hidden');
});

document.getElementById('filterByAll').addEventListener('click', () => {
    showTasks(manager.filterTasks('all'));
});

document.getElementById('filterByCompleted').addEventListener('click', () => {
    showTasks(manager.filterTasks('completed'));
});

document.getElementById('filterByRemaining').addEventListener('click', () => {
    showTasks(manager.filterTasks('remaining'));
});

document.getElementById('taskFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const task = new Task(Date.now(), title, description, new Date().toLocaleString());
    manager.addTask(task);
    
    document.getElementById('taskForm').classList.add('hidden');
    showTasks(manager.filterTasks('all'));
});

showTasks(manager.filterTasks('all'));