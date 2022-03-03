import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsAddComponent } from './Components/admin-components/admins-add/admins-add.component';

const routes: Routes = [
  {path:'addAdmin/:name',component:AdminsAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
