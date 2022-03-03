import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMealComponent } from './Components/add-meal/add-meal.component';
import { ConfirmRestComponent } from './Components/confirm-rest/confirm-rest.component';
import { ResDetailsComponent } from './Components/res-details/res-details.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';

const routes: Routes = [
  {path:'ResDetails/:id',component:ResDetailsComponent},
  {path:'Restaurants',component:RestaurantsComponent},
<<<<<<< HEAD
  {path:'',component:RestaurantsComponent}

=======
  {path:'addMeal/:idRes/:idMen/:NameColl',component:AddMealComponent}
>>>>>>> 3d987ee20444aaac6e35c4c92e90ae0a97478e5c
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
