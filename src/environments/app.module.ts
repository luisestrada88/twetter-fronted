import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/login/login.component';
import { NewUserComponent } from '../app/new-user/new-user.component';
import { ForgotPasswordComponent } from '../app/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../app/reset-password/reset-password.component';
import { LandingPageComponent } from '../app/landing-page/landing-page.component';
import { TweetsComponent } from '../app/tweets/tweets.component';
import { HomeComponent } from '../app/home/home.component';

import {FormsModule } from "@angular/forms";
import { CommentsComponent } from '../app/comments/comments.component';
import { NewPostComponent } from '../app/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LandingPageComponent,
    TweetsComponent,
    HomeComponent,
    CommentsComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
