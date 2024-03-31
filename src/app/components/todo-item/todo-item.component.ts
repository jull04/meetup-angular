import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import { IItem } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {

  @Input() item: IItem;

  @Output() onDone = new EventEmitter<void>();

  @Output() onRemove = new EventEmitter<void>();

  @Output() onStar = new EventEmitter<void>();

}
