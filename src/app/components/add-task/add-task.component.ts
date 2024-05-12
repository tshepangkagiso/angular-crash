import { Component,Input,Output,OnInit, EventEmitter} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';





@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{
  text: string = "";
  day: string = "";
  reminder: boolean = false;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

    constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }
  ngOnInit(): void {}

  onSubmit(){
    if(!this.text){
      alert('Please add a task');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    this.onAddTask.emit(newTask);
    //clear form
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
  
} 
