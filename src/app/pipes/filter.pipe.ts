import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../models/meetup';

@Pipe({
  name: 'filterMeetups',
})
export class FilterPipe implements PipeTransform {
  transform(mmetups: Meetup[], search: string): Meetup[] {
    console.log(search);
    return mmetups.filter((metups) => {
      return (
        metups.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
