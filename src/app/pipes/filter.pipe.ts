import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../models/meetup';

@Pipe({
  name: 'filterTodos',
})
export class FilterPipe implements PipeTransform {
  transform(mmetups: Meetup[], search: string): Meetup[] {
    console.log(search);
    return mmetups.filter((mmetups) => {
      return (
        mmetups.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
