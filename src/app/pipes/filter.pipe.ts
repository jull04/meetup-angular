import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/todo';

@Pipe({
  name: 'filterTodos',
})
export class FilterPipe implements PipeTransform {
  transform(todos: IItem[], search: string, filter: string): IItem[] {
    console.log(search);
    return todos.filter((todo) => {
      return (
        todo.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === '' ||
          (filter === 'normal' && !todo.important) ||
          (filter === 'important' && todo.important) ||
          (filter === 'completed' && todo.isCompleted))
      );
    });
  }
}
