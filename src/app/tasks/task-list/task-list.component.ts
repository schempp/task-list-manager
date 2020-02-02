import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Task } from '../task.model';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  displayedColumns: string[] = ['complete', 'title', 'delete'];
  private tasksSub: Subscription;

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListener().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  onUpdate(task: Task) {
    const completionUpdate = !task.isDone;
    this.tasksService.updateTask(task.id, task.title, completionUpdate);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
