import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EditUserComponent } from './page/profile/edit-user/edit-user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoggedOutGuard } from './common/guards/logged-out.guard';
import { LoggedInGuard } from './common/guards/logged-in.guard';
import { CheckDevGuard } from './common/guards/check-dev.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard, CheckDevGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard, CheckDevGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'edit-user', component: EditUserComponent, canActivate: [LoggedInGuard] },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
