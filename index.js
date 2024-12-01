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
      return tasks;
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
}