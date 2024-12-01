class Task {
    constructor(id, title, description, createdAt, completed = false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.createdAt = createdAt;
      this.completed = completed;
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
        <input type="checkbox" ${task.completed ? 'checked' : ''}">
        <span>${task.title}</span>
        <button>Edit</button>
        <button>Delete</button>
      `;
      taskListElement.appendChild(taskDiv);
    });
}