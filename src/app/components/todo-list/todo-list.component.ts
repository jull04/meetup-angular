import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { IItem } from '../../models/todo';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit{

  items: IItem[] = [];
  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService
      .fetchTodos()
      .subscribe();
  }

  newTodo: string;

  @Input() search: string;
  @Input() filter: string;

  handleStar(id: number) {
    this.todoService.star(id);
  }

  handleRemove(id: number) {
    this.todoService.remove(id);
  }

  handleDone(id: number) {
    this.todoService.done(id);
  }

  handleSearch(event: {search: string, filter: string}) {
    this.search = event.search;
    this.filter = event.filter;
  }

  handleAddTask(newTodo: string) {
    this.todoService.saveTodo(
      {
        name: newTodo,
        isCompleted: false,
        important: false,
        id: Date.now()
      }
    );
    this.newTodo = '';
  }
}
