import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AuthGardGuard } from './Services/authenticationGuard/auth-gard.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'allproject', component: AllProjectComponent },
  { path: 'projectdetail/:Pid', component: ProjectDetailsComponent },
  {
    path: 'myproject',
    component: MyProjectComponent,
    canActivate: [AuthGardGuard],
  },
  {
    path: 'addproject',
    component: AddProjectComponent,
    canActivate: [AuthGardGuard],
  },
  { path: 'login', component: LogInSignUpComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
