import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../custom-validator';
import { Router } from '@angular/router';
import { User } from '../../../common/models/user';
import { UsersService } from '../../../common/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  users: User[];
  submitted: boolean;

  constructor(private readonly fb: FormBuilder,
              public router: Router,
              private readonly usersService: UsersService) {
    this.editForm = fb.group({
      firstName: ['', Validators.required],
      login: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(5),
        CustomValidator.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        CustomValidator.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        )]
      ],
      contact: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  editUser() {
    if (this.editForm.invalid) {
      this.submitted = true;
    } else {
      this.usersService.updateOne(this.editForm.value).subscribe(data => {
        this.users = data;
        this.router.navigate(['/profile']);
      });
    }
  }

  getUser(): void  {
    this.usersService.getOne()
      .subscribe(users => this.users = users);
  }

}
