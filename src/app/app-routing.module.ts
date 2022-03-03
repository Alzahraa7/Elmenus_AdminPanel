import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMealComponent } from './Components/add-meal/add-meal.component';
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { ResDetailsComponent } from './Components/res-details/res-details.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';

const routes: Routes = [
  {path:'ResDetails/:id',component:ResDetailsComponent},
  {path:'Restaurants',component:RestaurantsComponent},
  {path:'addMeal/:idRes/:idMen/:NameColl',component:AddMealComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
