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
      this.meetupService.createMeetup(meetupData).subscribe(
        (response: ExtendedMeetup) => {
          this.popupService.close();
          console.log("Meetup created successfully:", response);
        },
        (error) => {
          console.error("Failed to create meetup:", error);
        }
      );
    }
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
