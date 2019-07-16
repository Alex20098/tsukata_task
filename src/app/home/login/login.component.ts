import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { CustomValidator } from '../../custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frm: FormGroup;
  message: boolean;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              public router: Router) {
    this.frm = fb.group({
      login: ['', Validators.required],
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
    });
  }

  ngOnInit(): void {
    this.frm.valueChanges.subscribe((value: string) => {
      if (value.length !== 0) {
        this.message = false;
      }
    });
  }

  enter(form: any): boolean {
    this.authService
      .auth(form.login, form.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.message = true;
        }
      );

    return false;
  }

}
