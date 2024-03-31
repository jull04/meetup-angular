import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {

  newTodo: string;

  @Output() onAddTask = new EventEmitter<string>();
}
