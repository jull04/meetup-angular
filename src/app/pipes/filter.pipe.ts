import { Pipe, PipeTransform } from '@angular/core';
import { ExtendedMeetup } from '../models/meetup';

@Pipe({
  name: 'filterMeetups',
})
export class FilterPipe implements PipeTransform {
  transform(metups: ExtendedMeetup[], search: string): ExtendedMeetup[] {
    console.log(search);
    return metups.filter((metups) => {
      return (
        metups.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
