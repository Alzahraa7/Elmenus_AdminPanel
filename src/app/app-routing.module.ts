import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsAddComponent } from './Components/admin-components/admins-add/admins-add.component';
import { AddCareerComponent } from './Components/add-career/add-career.component';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { ListCareerComponent } from './Components/list-career/list-career.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';
import { AddMealComponent } from './Components/add-meal/add-meal.component';
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ResDetailsComponent } from './Components/res-details/res-details.component';
import { AddRestaurantComponent } from './Components/add-restaurant/add-restaurant.component';
import { AdminsComponent } from './Components/admin-components/admins-list/admins.component';
import { MainUIComponent } from './Components/main-ui/main-ui.component';
import { UiformComponent } from './Components/uiform/uiform.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path:'', component:MainUIComponent,children:[
    { path: 'Restaurants', component: RestaurantsComponent},
    {path:'confirmRest', component:ConfirmRestComponent},
    {path:'Careers', component:ListCareerComponent},
    {path:'listAdmin',component:AdminsComponent},
    {path:'JobDetails/:Name',component:JobDetailsComponent},
    {path:'ResDetails/:id',component:ResDetailsComponent},
    {path:'Profile',component:ProfileComponent},
    {path:'',component:DashboardComponent},
  ]},
  {path:'',component:UiformComponent,children:[
    { path: 'addRestaurant', component: AddRestaurantComponent},
    {path:'addAdmin/:name',component:AdminsAddComponent},
    {path:'addCareer',component:AddCareerComponent},
    {path:'addCareer/:id',component:AddCareerComponent},
    {path:'addJob/:NameJob',component:AddJobComponent},
    {path:'addJob/:id/:Name',component:AddJobComponent},
    {path:'addMeal/:idRes/:idMen/:NameColl',component:AddMealComponent},
  ]},
  {path:'Login', component:LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
