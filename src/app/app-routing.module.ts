import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsAddComponent } from './Components/admin-components/admins-add/admins-add.component';
import { AddCareerComponent } from './Components/add-career/add-career.component';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { ListCareerComponent } from './Components/list-career/list-career.component';

const routes: Routes = [

  {path:'Careers', component:ListCareerComponent},
  {path:'addAdmin/:name',component:AdminsAddComponent},
  {path:'JobDetails/:Name',component:JobDetailsComponent},
  {path:'addCareer',component:AddCareerComponent},
  {path:'addCareer/:id',component:AddCareerComponent},
  {path:'addJob/:NameJob',component:AddJobComponent},
  {path:'addJob/:id/:Name',component:AddJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
