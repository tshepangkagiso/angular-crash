import { Component,OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { NgFor } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';





@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, NgFor, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService){}
  ngOnInit(): void {
    this.taskService.getTask().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task.id)));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task){
    console.log(task);
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }
}

