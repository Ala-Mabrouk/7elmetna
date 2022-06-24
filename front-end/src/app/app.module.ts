import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { SloganComponent } from './slogan/slogan.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AllProjectComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    SloganComponent,
    MyProjectComponent,

    PageNotFoundComponent,
    LogInSignUpComponent,
    SafePipe,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxQRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
