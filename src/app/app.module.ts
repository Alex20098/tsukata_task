import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/interceptor/token.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './common/services/auth.service';
import { UsersService } from './common/services/users.service';
import { AppComponent } from './app.component';
import { LoggedOutGuard } from './common/guards/logged-out.guard';
import { LoggedInGuard } from './common/guards/logged-in.guard';
import { CheckDevGuard } from './common/guards/check-dev.guard';
import { LoginComponent } from './home/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EditUserComponent } from './page/profile/edit-user/edit-user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditUserComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UsersService,
    LoggedOutGuard,
    LoggedInGuard,
    CheckDevGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
