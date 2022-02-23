import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { ListCareerComponent } from './Components/list-career/list-career.component';

const routes: Routes = [

  {path:'Careers', component:ListCareerComponent},
  {path:'JobDetails/:Name',component:JobDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
