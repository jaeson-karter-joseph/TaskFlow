import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];
  title = '';
  description = '';
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks. Check whether the API is running.';
        this.loading = false;
      }
    });
  }

  createTask(): void {
    if (!this.title.trim()) {
      return;
    }

    this.taskService.create({
      title: this.title.trim(),
      description: this.description.trim()
    }).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Unable to create task.';
      }
    });
  }

  toggleTask(task: Task): void {
    this.taskService.update(task.id, {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted
    }).subscribe({
      next: () => this.loadTasks(),
      error: () => {
        this.errorMessage = 'Unable to update task.';
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.delete(id).subscribe({
      next: () => this.loadTasks(),
      error: () => {
        this.errorMessage = 'Unable to delete task.';
      }
    });
  }
}