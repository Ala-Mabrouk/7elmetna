import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectPage2Component } from './add-project-page2/add-project-page2.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'allproject', component: AllProjectComponent },
  { path: 'projectdetail/:Pid', component: ProjectDetailsComponent },
  { path: 'myproject', component: MyProjectComponent },
  { path: 'addprojectpage1', component: AddProjectComponent },
  { path: 'addprojectpage2', component: AddProjectPage2Component },

  { path: 'login', component: LogInSignUpComponent },


  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
