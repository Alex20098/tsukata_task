import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user';
import { UsersService } from '../../common/services/users.service';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: User[];

  constructor(private readonly usersService: UsersService,
              public router: Router,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void  {
    this.usersService.getOne()
      .subscribe(users => this.users = users);
  }

  deleteUser(): void {
    this.usersService.deleteOne().subscribe(() => {
      delete this.users;
    });
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateUser(): void {
    this.router.navigate(['/edit-user']);
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
