import { Component, EventEmitter, Output } from '@angular/core';
import '@angular/compiler'; 

@Component({
  selector: 'app-meetup-search',
  templateUrl: './meetup-search.component.html',
  styleUrl: './meetup-search.component.scss'
})
export class MeetupSearchComponent {

  search = '';

  @Output() onSearch = new EventEmitter<{search: string}>();

}
