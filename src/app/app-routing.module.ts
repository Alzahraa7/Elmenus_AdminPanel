import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './Components/add-restaurant/add-restaurant.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';

const routes: Routes = [
  { path: '', redirectTo: '/Restaurants', pathMatch: 'full' },
  { path: 'Restaurants', component: RestaurantsComponent},
  { path: 'addRestaurant', component: AddRestaurantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
