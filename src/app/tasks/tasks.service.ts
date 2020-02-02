import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get(
      'http://localhost:3000/api/tasks'
    )
    .pipe(map((taskData: any[]) => {
      return taskData.map(task => {
        return {
          id: task._id,
          title: task.title,
          isDone: task.isDone
        };
      });
    }))
    .subscribe((transformedTasks) => {
      this.tasks = transformedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(title: string) {
    const task: Task = {id: null, title: title, isDone: false};
    this.http.post<{ message: string, taskId: string }>('http://localhost:3000/api/tasks', task)
      .subscribe((responseData) => {
        const id = responseData.taskId;
        task.id = id;
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(id: string, title: string, isDone: boolean) {
    const task: Task = { id: id, title: title, isDone: isDone };
    this.http.put('http://localhost:3000/api/tasks/' + id, task)
      .subscribe(response => console.log(response));
  }

  deleteTask(taskId: string) {
    this.http.delete('http://localhost:3000/api/tasks/' + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }
}
