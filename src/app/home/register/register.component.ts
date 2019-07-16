import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { CustomValidator } from '../../custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  reg: FormGroup;
  message: boolean;
  submitted: boolean;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              public router: Router) {
    this.reg = fb.group({
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
    this.submitted = false;
  }

  ngOnInit(): void {
    this.reg.valueChanges.subscribe((value: string) => {
      if (value.length !== 0) {
        this.message = false;
      }
    });
  }

  auth(reg: any): boolean {
    this.submitted = true;
    this.authService
      .register(reg.login, reg.password, reg.firstName, reg.city, reg.contact)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.message = true;
        }
      );

    return false;
  }

}
