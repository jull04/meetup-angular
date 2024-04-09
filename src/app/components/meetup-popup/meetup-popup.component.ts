import { Component, OnInit } from "@angular/core";
import { ExtendedMeetup, Meetup } from "../../models/meetup";
import { MeetupService } from "../../services/meetup.service";
import { PopupService } from "../../services/popup.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-meetup-popup",
  templateUrl: "./meetup-popup.component.html",
  styleUrl: "./meetup-popup.component.scss",
})
export class MeetupPopupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public popupService: PopupService,
    public meetupService: MeetupService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.popupService.meetupToEdit) {
    this.form = this.fb.group({
      name: [this.popupService.meetupToEdit.name, [Validators.required]],
      date: [this.popupService.meetupToEdit.time, [Validators.required]],
      time: [this.popupService.meetupToEdit.time, [Validators.required]],
      location: [this.popupService.meetupToEdit.location, [Validators.required]],
      description: [this.popupService.meetupToEdit.description, [Validators.required]],
      target: [this.popupService.meetupToEdit.target_audience, [Validators.required]],
      know: [this.popupService.meetupToEdit.need_to_know, [Validators.required]],
      reason: [this.popupService.meetupToEdit.reason_to_come, [Validators.required]],
      will_happen: [this.popupService.meetupToEdit.will_happen, [Validators.required]],
      duration: [this.popupService.meetupToEdit.duration, [Validators.required]],
    });
    } else {
      this.form = this.fb.group({
        name: ["", [Validators.required]],
        date: ["", [Validators.required]],
        time: ["", [Validators.required]],
        location: ["", [Validators.required]],
        description: ["", [Validators.required]],
        target: ["", [Validators.required]],
        know: ["", [Validators.required]],
        reason: ["", [Validators.required]],
        will_happen: ["", [Validators.required]],
        duration: ["", [Validators.required]],
      });
    }
    this.form.valueChanges.subscribe((value) =>
      console.log(`${value.name}: ${value.time}`)
    );
  
  }

  closePopup() {
    this.popupService.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const meetupData: Meetup = this.convertData(this.form.value);
      if (this.popupService.meetupToEdit) {
        this.meetupService.editMeetup(this.popupService.meetupToEdit.id, meetupData).subscribe({
          next: (response: ExtendedMeetup) => {
            this.popupService.close();
            console.log("Meetup created successfully:", response);
          },
          error: (error) => {
            console.error("Failed to create meetup:", error);
          }
      });
      } else {
      this.meetupService.createMeetup(meetupData).subscribe({
        next: (response: ExtendedMeetup) => {
          this.popupService.close();
          console.log("Meetup created successfully:", response);
        },
        error: (error) => {
          console.error("Failed to create meetup:", error);
        }
      });
    }}
  }

  private convertData(formData: any): Meetup {
    return {
      name: formData.name,
      description: formData.description,
      time: new Date(formData.date + ' ' + formData.time).toISOString(),
      duration: formData.duration,
      location: formData.location,
      target_audience: formData.target,
      need_to_know: formData.know,
      will_happen: formData.will_happen,
      reason_to_come: formData.reason,
    };
  }
}
