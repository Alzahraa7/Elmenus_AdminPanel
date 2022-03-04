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

const routes: Routes = [
  { path: 'Restaurants', component: RestaurantsComponent},
  { path: 'addRestaurant', component: AddRestaurantComponent},
  {path:'Careers', component:ListCareerComponent},
  {path:'addAdmin/:name',component:AdminsAddComponent},
  {path:'JobDetails/:Name',component:JobDetailsComponent},
  {path:'addCareer',component:AddCareerComponent},
  {path:'addCareer/:id',component:AddCareerComponent},
  {path:'addJob/:NameJob',component:AddJobComponent},
  {path:'addJob/:id/:Name',component:AddJobComponent},
  {path:'ResDetails/:id',component:ResDetailsComponent},
  {path:'Restaurants',component:RestaurantsComponent},
  {path:'addMeal/:idRes/:idMen/:NameColl',component:AddMealComponent},
  {path:'',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
