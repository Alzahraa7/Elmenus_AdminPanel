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
import { AuthGuard } from './Gaurds/auth.guard';

const routes: Routes = [
  {path:'', component:MainUIComponent,canActivate: [AuthGuard],children:[
    { path: 'Restaurants', component: RestaurantsComponent, canActivate: [AuthGuard]},
    {path:'confirmRest', component:ConfirmRestComponent, canActivate: [AuthGuard]},
    {path:'Careers', component:ListCareerComponent, canActivate: [AuthGuard]},
    {path:'listAdmin',component:AdminsComponent, canActivate: [AuthGuard]},
    {path:'JobDetails/:Name',component:JobDetailsComponent, canActivate: [AuthGuard]},
    {path:'ResDetails/:id',component:ResDetailsComponent, canActivate: [AuthGuard]},
    {path:'Profile',component:ProfileComponent, canActivate: [AuthGuard]},
    {path:'',component:DashboardComponent},
  ]},
  {path:'',component:UiformComponent,canActivate: [AuthGuard],children:[
    { path: 'addRestaurant', component: AddRestaurantComponent, canActivate: [AuthGuard]},
    {path:'addAdmin/:name',component:AdminsAddComponent, canActivate: [AuthGuard]},
    {path:'addCareer',component:AddCareerComponent, canActivate: [AuthGuard]},
    {path:'addCareer/:id',component:AddCareerComponent, canActivate: [AuthGuard]},
    {path:'addJob/:NameJob',component:AddJobComponent, canActivate: [AuthGuard]},
    {path:'addJob/:id/:Name',component:AddJobComponent, canActivate: [AuthGuard]},
    {path:'addMeal/:idRes/:idMen/:NameColl',component:AddMealComponent, canActivate: [AuthGuard]},
  ]},
  {path:'login', component:LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
