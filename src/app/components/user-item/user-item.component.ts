import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { PopupService } from "../../services/popup.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrl: "./user-item.component.scss",
})
export class UserItemComponent {
  @Input() item: User;

  isEditing: boolean = false;

  form!: FormGroup;

  constructor(
    public popupService: PopupService,
    public userService: UserService,
    public fb: FormBuilder
  ) {}

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  ngOnInit() {
    console.log(this.item)
    this.form = this.fb.group({
      role: [this.item.roles[0].name, [Validators.required]],
    });
  }

  onSubmit() {
    this.userService.rewriteRoles(this.item.id, this.form.value.role).subscribe();
  }


  deleteMeetup() {
    this.userService.deleteUser(this.item.id).subscribe({
      next: (response) => {
        console.log("Успешно удалено", response);
      },
      error(error) {
        console.error("Ошибка при удалении", error);
      },
    });
  }
}
